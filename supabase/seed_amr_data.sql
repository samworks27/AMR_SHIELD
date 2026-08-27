-- AMR Surveillance Seed Data
-- Run this in Supabase Dashboard > SQL Editor after running schema.sql

-- First, ensure drugs exist
insert into public.drugs (name, generic_name, drug_class, description, contraindications, interactions, side_effects, source)
values
  ('Ceftriaxone', 'Ceftriaxone', 'Cephalosporin antibiotic', 'Third-generation cephalosporin antibacterial', 'Serious cephalosporin or beta-lactam allergy', 'Check calcium-containing IV products and duplicate beta-lactams', 'Diarrhea; rash; injection reactions', 'WHO GLASS'),
  ('Ciprofloxacin', 'Ciprofloxacin', 'Fluoroquinolone antibiotic', 'Fluoroquinolone antibacterial used for selected infections', 'Fluoroquinolone allergy; tendon or rhythm risks need review', 'Separate from antacids, iron or calcium; check QT-prolonging drugs', 'Nausea; tendon pain; nervous-system effects', 'WHO GLASS'),
  ('Amikacin', 'Amikacin', 'Aminoglycoside antibiotic', 'Aminoglycoside antibacterial for selected serious infections', 'Serious aminoglycoside allergy; renal or hearing risk needs review', 'Avoid other nephrotoxic or ototoxic drugs unless monitored', 'Kidney injury; hearing or balance changes', 'WHO GLASS'),
  ('Meropenem', 'Meropenem', 'Carbapenem antibiotic', 'Carbapenem antibacterial for selected serious infections', 'Serious beta-lactam allergy; seizure risk needs review', 'Check valproate because levels may fall; review other beta-lactams', 'Diarrhea; nausea; rash', 'WHO GLASS'),
  ('Piperacillin', 'Piperacillin', 'Penicillin antibiotic', 'Penicillin antibacterial for selected serious infections', 'Serious penicillin or beta-lactam allergy; renal dosing needs review', 'Check anticoagulants, kidney-toxic drugs and duplicate beta-lactams', 'Diarrhea; rash; electrolyte changes', 'WHO GLASS'),
  ('Azithromycin', 'Azithromycin', 'Macrolide antibiotic', 'Macrolide antibacterial used for selected bacterial infections', 'Macrolide allergy; rhythm or liver conditions need review', 'Check QT-prolonging drugs; avoid duplicate macrolide therapy', 'Nausea; diarrhea; rhythm changes', 'WHO GLASS'),
  ('Gentamicin', 'Gentamicin', 'Aminoglycoside antibiotic', 'Aminoglycoside antibacterial for selected serious infections', 'Serious aminoglycoside allergy; renal or hearing risk needs review', 'Avoid other nephrotoxic or ototoxic drugs unless monitored', 'Kidney injury; hearing or balance changes', 'WHO GLASS'),
  ('Cefepime', 'Cefepime', 'Cephalosporin antibiotic', 'Fourth-generation cephalosporin antibacterial', 'Serious cephalosporin or beta-lactam allergy; renal dosing needs review', 'Check other medicines affecting the nervous system or kidney', 'Rash; diarrhea; confusion risk', 'WHO GLASS'),
  ('Levofloxacin', 'Levofloxacin', 'Fluoroquinolone antibiotic', 'Fluoroquinolone antibacterial used for selected infections', 'Fluoroquinolone allergy; tendon or rhythm risks need review', 'Separate from antacids, iron or calcium; check QT-prolonging drugs', 'Nausea; tendon pain; rhythm changes', 'WHO GLASS'),
  ('Doxycycline', 'Doxycycline', 'Tetracycline antibiotic', 'Tetracycline antibacterial used for susceptible bacterial infections', 'Tetracycline allergy; pregnancy or young-child use needs review', 'Separate from antacids, iron, calcium or magnesium', 'Nausea; sun sensitivity; esophageal irritation', 'WHO GLASS'),
  ('Imipenem', 'Imipenem', 'Carbapenem antibiotic', 'Carbapenem antibacterial usually administered with cilastatin', 'Serious beta-lactam allergy; seizure risk needs review', 'Check valproate because levels may fall; review other beta-lactams', 'Diarrhea; nausea; seizure risk', 'WHO GLASS'),
  ('Ertapenem', 'Ertapenem', 'Carbapenem antibiotic', 'Carbapenem antibacterial for selected serious infections', 'Serious beta-lactam allergy; seizure risk needs review', 'Check valproate because levels may fall; review other beta-lactams', 'Diarrhea; nausea; injection reactions', 'WHO GLASS'),
  ('Clindamycin', 'Clindamycin', 'Lincosamide antibiotic', 'Lincosamide antibacterial used for susceptible infections', 'Serious clindamycin or lincomycin allergy', 'Tell the clinician about medicines that affect neuromuscular function', 'Diarrhea; abdominal pain; colitis risk', 'WHO GLASS'),
  ('Daptomycin', 'Daptomycin', 'Lipopeptide antibiotic', 'Cyclic lipopeptide antibacterial for selected serious infections', 'Serious daptomycin allergy; muscle disease needs review', 'Check statins and other medicines affecting muscle', 'Muscle pain; raised muscle enzymes; injection reactions', 'WHO GLASS'),
  ('Oxacillin', 'Oxacillin', 'Penicillin antibiotic', 'Penicillinase-resistant penicillin antibacterial', 'Serious penicillin allergy', 'Check anticoagulants and duplicate beta-lactam therapy', 'Rash; diarrhea; liver enzyme changes', 'WHO GLASS'),
  ('Linezolid', 'Linezolid', 'Oxazolidinone antibiotic', 'Oxazolidinone antibacterial for selected resistant infections', 'Serious linezolid allergy; uncontrolled hypertension needs review', 'Avoid MAO inhibitors and review serotonergic or adrenergic medicines', 'Nausea; headache; blood-count changes', 'WHO GLASS'),
  ('Vancomycin', 'Vancomycin', 'Glycopeptide antibiotic', 'Glycopeptide antibacterial for selected serious gram-positive infections', 'Serious vancomycin allergy; renal or hearing risk needs review', 'Avoid other nephrotoxic or ototoxic drugs unless monitored', 'Kidney injury; infusion reaction; hearing changes', 'WHO GLASS'),
  ('Minocycline', 'Minocycline', 'Tetracycline antibiotic', 'Tetracycline antibacterial used for susceptible bacterial infections', 'Tetracycline allergy; pregnancy or young-child use needs review', 'Separate from antacids, iron, calcium or magnesium', 'Nausea; dizziness; sun sensitivity', 'WHO GLASS'),
  ('Tigecycline', 'Tigecycline', 'Glycylcycline antibiotic', 'Broad-spectrum antibacterial for selected serious infections', 'Serious tetracycline allergy; pregnancy needs review', 'Review anticoagulants and other medicines affecting liver or kidney', 'Nausea; vomiting; liver-enzyme changes', 'WHO GLASS'),
  ('Rifampin', 'Rifampin', 'Rifamycin antibiotic', 'Rifamycin antibacterial used in specific treatment regimens', 'Rifamycin allergy; liver disease or interacting medicines needs review', 'Strong enzyme inducer: check anticoagulants, contraceptives and antivirals', 'Liver injury; orange body fluids; nausea', 'WHO GLASS'),
  ('Colistin', 'Colistin', 'Polymyxin antibiotic', 'Polymyxin antibacterial for selected serious gram-negative infections', 'Serious polymyxin allergy; kidney or nerve disease needs review', 'Check other kidney-toxic or nerve-affecting medicines', 'Kidney injury; nerve symptoms; breathing difficulty', 'WHO GLASS'),
  ('Trimethoprim', 'Trimethoprim', 'Diaminopyrimidine antibiotic', 'Diaminopyrimidine antibacterial commonly used for selected urinary and other infections', 'Serious trimethoprim allergy; kidney disease or folate deficiency needs review', 'Check medicines affecting kidney function or blood counts', 'Nausea; rash; blood-count changes', 'WHO GLASS'),
  ('Spectinomycin', 'Spectinomycin', 'Aminocyclitol antibiotic', 'Aminocyclitol antibacterial mainly used for selected gonococcal infections', 'Serious spectinomycin allergy', 'Review other injectable antibiotics for compatibility', 'Injection-site pain; nausea; dizziness', 'WHO GLASS'),
  ('Amoxicillin', 'Amoxicillin', 'Penicillin antibiotic', 'Penicillin antibacterial used for susceptible bacterial infections', 'Serious penicillin allergy', 'Check anticoagulants and duplicate beta-lactam therapy', 'Nausea; diarrhea; rash', 'WHO GLASS'),
  ('Penicillin', 'Penicillin', 'Penicillin antibiotic', 'Natural penicillin antibacterial for susceptible infections', 'Serious penicillin allergy', 'Review other beta-lactam antibiotics and anticoagulants', 'Nausea; diarrhea; rash; allergic reactions', 'WHO GLASS')
on conflict (name) do nothing;

-- Insert observations using a CTE to resolve drug UUIDs
with drug_map as (
  select id, name from public.drugs
)
insert into public.resistance_observations (organism, drug_id, resistance_rate, source, period, updated_at)
values
  -- E. coli
  ('E. coli', (select id from drug_map where name = 'Ceftriaxone'), 68, 'WHO GLASS', '2026-Q3', now() - interval '30 days'),
  ('E. coli', (select id from drug_map where name = 'Ciprofloxacin'), 54, 'WHO GLASS', '2026-Q3', now() - interval '28 days'),
  ('E. coli', (select id from drug_map where name = 'Amikacin'), 12, 'WHO GLASS', '2026-Q3', now() - interval '25 days'),
  ('E. coli', (select id from drug_map where name = 'Meropenem'), 7, 'WHO GLASS', '2026-Q3', now() - interval '22 days'),
  ('E. coli', (select id from drug_map where name = 'Piperacillin'), 31, 'WHO GLASS', '2026-Q3', now() - interval '20 days'),
  ('E. coli', (select id from drug_map where name = 'Azithromycin'), 45, 'WHO GLASS', '2026-Q3', now() - interval '18 days'),
  ('E. coli', (select id from drug_map where name = 'Gentamicin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '15 days'),
  ('E. coli', (select id from drug_map where name = 'Cefepime'), 38, 'WHO GLASS', '2026-Q3', now() - interval '12 days'),
  ('E. coli', (select id from drug_map where name = 'Levofloxacin'), 52, 'WHO GLASS', '2026-Q3', now() - interval '10 days'),
  ('E. coli', (select id from drug_map where name = 'Doxycycline'), 29, 'WHO GLASS', '2026-Q3', now() - interval '8 days'),
  ('E. coli', (select id from drug_map where name = 'Clindamycin'), 45, 'WHO GLASS', '2026-Q3', now() - interval '5 days'),
  ('E. coli', (select id from drug_map where name = 'Daptomycin'), 5, 'WHO GLASS', '2026-Q3', now() - interval '3 days'),

  -- K. pneumoniae
  ('K. pneumoniae', (select id from drug_map where name = 'Ceftriaxone'), 72, 'WHO GLASS', '2026-Q3', now() - interval '29 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Ciprofloxacin'), 61, 'WHO GLASS', '2026-Q3', now() - interval '27 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Amikacin'), 24, 'WHO GLASS', '2026-Q3', now() - interval '24 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Meropenem'), 16, 'WHO GLASS', '2026-Q3', now() - interval '21 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Piperacillin'), 48, 'WHO GLASS', '2026-Q3', now() - interval '19 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Imipenem'), 19, 'WHO GLASS', '2026-Q3', now() - interval '16 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Ertapenem'), 22, 'WHO GLASS', '2026-Q3', now() - interval '14 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Gentamicin'), 35, 'WHO GLASS', '2026-Q3', now() - interval '11 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Cefepime'), 42, 'WHO GLASS', '2026-Q3', now() - interval '9 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Amoxicillin'), 78, 'WHO GLASS', '2026-Q3', now() - interval '7 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Rifampin'), 15, 'WHO GLASS', '2026-Q3', now() - interval '4 days'),
  ('K. pneumoniae', (select id from drug_map where name = 'Linezolid'), 8, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),

  -- P. aeruginosa
  ('P. aeruginosa', (select id from drug_map where name = 'Ceftriaxone'), 45, 'WHO GLASS', '2026-Q3', now() - interval '26 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Ciprofloxacin'), 38, 'WHO GLASS', '2026-Q3', now() - interval '23 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Amikacin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '20 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Meropenem'), 29, 'WHO GLASS', '2026-Q3', now() - interval '17 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Piperacillin'), 42, 'WHO GLASS', '2026-Q3', now() - interval '13 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Piperacillin/Tazobactam'), 28, 'WHO GLASS', '2026-Q3', now() - interval '10 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Imipenem'), 32, 'WHO GLASS', '2026-Q3', now() - interval '7 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Cefepime'), 35, 'WHO GLASS', '2026-Q3', now() - interval '4 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Gentamicin'), 22, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Levofloxacin'), 40, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('P. aeruginosa', (select id from drug_map where name = 'Colistin'), 5, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),

  -- A. baumannii
  ('A. baumannii', (select id from drug_map where name = 'Ceftriaxone'), 81, 'WHO GLASS', '2026-Q3', now() - interval '25 days'),
  ('A. baumannii', (select id from drug_map where name = 'Ciprofloxacin'), 74, 'WHO GLASS', '2026-Q3', now() - interval '22 days'),
  ('A. baumannii', (select id from drug_map where name = 'Amikacin'), 43, 'WHO GLASS', '2026-Q3', now() - interval '19 days'),
  ('A. baumannii', (select id from drug_map where name = 'Meropenem'), 57, 'WHO GLASS', '2026-Q3', now() - interval '16 days'),
  ('A. baumannii', (select id from drug_map where name = 'Piperacillin'), 69, 'WHO GLASS', '2026-Q3', now() - interval '13 days'),
  ('A. baumannii', (select id from drug_map where name = 'Imipenem'), 62, 'WHO GLASS', '2026-Q3', now() - interval '10 days'),
  ('A. baumannii', (select id from drug_map where name = 'Cefepime'), 58, 'WHO GLASS', '2026-Q3', now() - interval '7 days'),
  ('A. baumannii', (select id from drug_map where name = 'Gentamicin'), 48, 'WHO GLASS', '2026-Q3', now() - interval '4 days'),
  ('A. baumannii', (select id from drug_map where name = 'Minocycline'), 35, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),
  ('A. baumannii', (select id from drug_map where name = 'Trimethoprim'), 72, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('A. baumannii', (select id from drug_map where name = 'Tigecycline'), 12, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),

  -- S. aureus
  ('S. aureus', (select id from drug_map where name = 'Ceftriaxone'), 36, 'WHO GLASS', '2026-Q3', now() - interval '24 days'),
  ('S. aureus', (select id from drug_map where name = 'Ciprofloxacin'), 28, 'WHO GLASS', '2026-Q3', now() - interval '21 days'),
  ('S. aureus', (select id from drug_map where name = 'Amikacin'), 9, 'WHO GLASS', '2026-Q3', now() - interval '18 days'),
  ('S. aureus', (select id from drug_map where name = 'Meropenem'), 11, 'WHO GLASS', '2026-Q3', now() - interval '15 days'),
  ('S. aureus', (select id from drug_map where name = 'Piperacillin'), 22, 'WHO GLASS', '2026-Q3', now() - interval '12 days'),
  ('S. aureus', (select id from drug_map where name = 'Oxacillin'), 45, 'WHO GLASS', '2026-Q3', now() - interval '9 days'),
  ('S. aureus', (select id from drug_map where name = 'Clindamycin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '6 days'),
  ('S. aureus', (select id from drug_map where name = 'Doxycycline'), 15, 'WHO GLASS', '2026-Q3', now() - interval '3 days'),
  ('S. aureus', (select id from drug_map where name = 'Linezolid'), 2, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),
  ('S. aureus', (select id from drug_map where name = 'Vancomycin'), 3, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('S. aureus', (select id from drug_map where name = 'Daptomycin'), 3, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('S. aureus', (select id from drug_map where name = 'Rifampin'), 8, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),

  -- S. pneumoniae
  ('S. pneumoniae', (select id from drug_map where name = 'Penicillin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '20 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Amoxicillin'), 12, 'WHO GLASS', '2026-Q3', now() - interval '17 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Azithromycin'), 22, 'WHO GLASS', '2026-Q3', now() - interval '14 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Clindamycin'), 15, 'WHO GLASS', '2026-Q3', now() - interval '11 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Ceftriaxone'), 14, 'WHO GLASS', '2026-Q3', now() - interval '8 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Levofloxacin'), 8, 'WHO GLASS', '2026-Q3', now() - interval '5 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Vancomycin'), 0, 'WHO GLASS', '2026-Q3', now() - interval '3 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Meropenem'), 25, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Ertapenem'), 20, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Cefepime'), 19, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('S. pneumoniae', (select id from drug_map where name = 'Rifampin'), 5, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),

  -- N. gonorrhoeae
  ('N. gonorrhoeae', (select id from drug_map where name = 'Ceftriaxone'), 15, 'WHO GLASS', '2026-Q3', now() - interval '18 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Ciprofloxacin'), 55, 'WHO GLASS', '2026-Q3', now() - interval '15 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Azithromycin'), 22, 'WHO GLASS', '2026-Q3', now() - interval '12 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Doxycycline'), 30, 'WHO GLASS', '2026-Q3', now() - interval '9 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Spectinomycin'), 8, 'WHO GLASS', '2026-Q3', now() - interval '6 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Gentamicin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '3 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Amoxicillin'), 48, 'WHO GLASS', '2026-Q3', now() - interval '2 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Cefepime'), 12, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Levofloxacin'), 45, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),
  ('N. gonorrhoeae', (select id from drug_map where name = 'Ertapenem'), 10, 'WHO GLASS', '2026-Q3', now() - interval '1 days'),

  -- Salmonella
  ('Salmonella', (select id from drug_map where name = 'Ciprofloxacin'), 35, 'WHO GLASS', '2026-Q3', now() - interval '15 days'),
  ('Salmonella', (select id from drug_map where name = 'Ceftriaxone'), 15, 'WHO GLASS', '2026-Q3', now() - interval '12 days'),
  ('Salmonella', (select id from drug_map where name = 'Azithromycin'), 12, 'WHO GLASS', '2026-Q3', now() - interval '9 days'),
  ('Salmonella', (select id from drug_map where name = 'Amikacin'), 8, 'WHO GLASS', '2026-Q3', now() - interval '6 days'),
  ('Salmonella', (select id from drug_map where name = 'Meropenem'), 5, 'WHO GLASS', '2026-Q3', now() - interval '3 days'),

  -- Shigella
  ('Shigella', (select id from drug_map where name = 'Ciprofloxacin'), 28, 'WHO GLASS', '2026-Q3', now() - interval '14 days'),
  ('Shigella', (select id from drug_map where name = 'Azithromycin'), 18, 'WHO GLASS', '2026-Q3', now() - interval '11 days'),
  ('Shigella', (select id from drug_map where name = 'Ceftriaxone'), 22, 'WHO GLASS', '2026-Q3', now() - interval '8 days'),
  ('Shigella', (select id from drug_map where name = 'Amikacin'), 10, 'WHO GLASS', '2026-Q3', now() - interval '5 days'),
  ('Shigella', (select id from drug_map where name = 'Meropenem'), 6, 'WHO GLASS', '2026-Q3', now() - interval '2 days')
on conflict (organism, drug_id, source, period) do nothing;
