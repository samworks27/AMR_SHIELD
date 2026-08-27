-- Run this in Supabase Dashboard > SQL Editor > New query

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('doctor', 'patient', 'hospital')),
  title text not null,
  organism text not null,
  drug text not null,
  resistance_rate numeric not null check (resistance_rate >= 0 and resistance_rate <= 100),
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;

drop policy if exists "Users can view their own reports" on public.reports;
create policy "Users can view their own reports"
on public.reports for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their own reports" on public.reports;
create policy "Users can create their own reports"
on public.reports for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own reports" on public.reports;
create policy "Users can update their own reports"
on public.reports for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own reports" on public.reports;
create policy "Users can delete their own reports"
on public.reports for delete
to authenticated
using (auth.uid() = user_id);

create table if not exists public.drugs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  generic_name text,
  drug_class text,
  description text,
  contraindications text,
  interactions text,
  side_effects text,
  source text not null,
  source_url text,
  updated_at timestamptz not null default now()
);

-- These nullable columns keep existing CSV imports compatible while allowing
-- the reference UI to show concise label-based safety metadata.
alter table public.drugs add column if not exists contraindications text;
alter table public.drugs add column if not exists interactions text;
alter table public.drugs add column if not exists side_effects text;

create table if not exists public.resistance_observations (
  id uuid primary key default gen_random_uuid(),
  drug_id uuid references public.drugs(id) on delete cascade,
  organism text not null,
  resistance_rate numeric check (resistance_rate between 0 and 100),
  location text,
  year integer,
  sample_count integer,
  source text not null,
  source_url text,
  updated_at timestamptz not null default now()
);

alter table public.drugs enable row level security;
alter table public.resistance_observations enable row level security;

drop policy if exists "Anyone can view drugs" on public.drugs;
create policy "Anyone can view drugs"
on public.drugs for select
to anon, authenticated
using (true);

drop policy if exists "Anyone can view resistance data" on public.resistance_observations;
create policy "Anyone can view resistance data"
on public.resistance_observations for select
to anon, authenticated
using (true);

create table if not exists public.prediction_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  illness_site text not null,
  temperature numeric not null,
  white_blood_cells integer not null,
  onset_days integer not null,
  symptoms text[] not null default '{}',
  symptom_notes text,
  top_candidate text not null,
  confidence numeric not null check (confidence between 0 and 100),
  created_at timestamptz not null default now()
);

alter table public.prediction_runs enable row level security;

drop policy if exists "Users can view their own prediction runs" on public.prediction_runs;
create policy "Users can view their own prediction runs"
on public.prediction_runs for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their own prediction runs" on public.prediction_runs;
create policy "Users can create their own prediction runs"
on public.prediction_runs for insert
to authenticated
with check (auth.uid() = user_id);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  amr_id text unique not null default ('AMR-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  full_name text not null,
  date_of_birth date not null,
  contact_number text not null,
  aadhaar_last4 text not null check (aadhaar_last4 ~ '^[0-9]{4}$'),
  aadhaar_hash text not null,
  allergies text,
  comorbidities text,
  profile_picture_url text,
  role text not null check (role in ('doctor', 'patient', 'hospital')),
  created_at timestamptz not null default now()
);

-- Safe migration for profiles created before profile pictures were introduced.
alter table public.profiles add column if not exists profile_picture_url text;

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Profile pictures are public URLs, but only the owning authenticated user can
-- write objects under their own user-id folder. Apply this block once per project.
insert into storage.buckets (id, name, public)
values ('profile-pictures', 'profile-pictures', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view profile pictures" on storage.objects;
create policy "Public can view profile pictures"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'profile-pictures');

drop policy if exists "Users can upload their profile picture" on storage.objects;
create policy "Users can upload their profile picture"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'profile-pictures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update their profile picture" on storage.objects;
create policy "Users can update their profile picture"
on storage.objects for update
to authenticated
using (
  bucket_id = 'profile-pictures'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'profile-pictures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete their profile picture" on storage.objects;
create policy "Users can delete their profile picture"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'profile-pictures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id, full_name, date_of_birth, contact_number, aadhaar_last4,
    aadhaar_hash, allergies, comorbidities, role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'AMR SHIELD User'),
    coalesce((new.raw_user_meta_data->>'date_of_birth')::date, '1970-01-01'::date),
    new.raw_user_meta_data->>'contact_number',
    new.raw_user_meta_data->>'aadhaar_last4',
    new.raw_user_meta_data->>'aadhaar_hash',
    new.raw_user_meta_data->>'allergies',
    new.raw_user_meta_data->>'comorbidities',
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.clinical_assessments (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references auth.users(id) on delete cascade,
  patient_key text not null,
  patient_name text not null,
  diagnosis text,
  differential text,
  rationale text,
  certainty text not null default 'Moderate',
  disposition text not null default 'Outpatient follow-up',
  treatment_plan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (doctor_id, patient_key)
);

alter table public.clinical_assessments enable row level security;

drop policy if exists "Doctors can view their assessments" on public.clinical_assessments;
create policy "Doctors can view their assessments"
on public.clinical_assessments for select
to authenticated
using (auth.uid() = doctor_id);

drop policy if exists "Doctors can create their assessments" on public.clinical_assessments;
create policy "Doctors can create their assessments"
on public.clinical_assessments for insert
to authenticated
with check (auth.uid() = doctor_id);

drop policy if exists "Doctors can update their assessments" on public.clinical_assessments;
create policy "Doctors can update their assessments"
on public.clinical_assessments for update
to authenticated
using (auth.uid() = doctor_id)
with check (auth.uid() = doctor_id);

create table if not exists public.patient_inquiries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references auth.users(id) on delete cascade,
  illness_site text not null,
  symptoms text not null,
  temperature numeric,
  previous_antibiotics text,
  allergies text,
  comorbidities text,
  created_at timestamptz not null default now()
);

alter table public.patient_inquiries enable row level security;

drop policy if exists "Patients can view their inquiries" on public.patient_inquiries;
create policy "Patients can view their inquiries"
on public.patient_inquiries for select
to authenticated
using (auth.uid() = patient_id);

drop policy if exists "Patients can create their inquiries" on public.patient_inquiries;
create policy "Patients can create their inquiries"
on public.patient_inquiries for insert
to authenticated
with check (auth.uid() = patient_id);

drop policy if exists "Doctors can view patient inquiries" on public.patient_inquiries;
create policy "Doctors can view patient inquiries"
on public.patient_inquiries for select
to authenticated
using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'doctor');
