# AMR SHIELD

AMR SHIELD is an explainable antimicrobial-resistance decision-support prototype for doctors, patients and hospitals. It connects patient history, symptoms, laboratory evidence, culture/AST results, resistance patterns and doctor judgement in one workflow.

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open the localhost URL printed by Vite. If port `5173` is busy, Vite will use the next available port, such as `5174`.

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`.
3. Run [`supabase/schema.sql`](supabase/schema.sql) in Supabase SQL Editor.
4. Import [`supabase/drugs.csv`](supabase/drugs.csv) into the `drugs` table.
5. Create a test account from the app.

The `.env.local` file is ignored by git. Never commit service-role keys or real patient data.

## Demo flow

Choose **Doctor**, sign in, select a synthetic patient, review history, reports and cultures, inspect the explainable prototype signal, complete the doctor assessment, acknowledge the clinical safety gate, and save the plan.

The prediction is a transparent research prototype, not a validated diagnostic model or autonomous prescribing system. Synthetic demo records are used in the doctor workspace.

## Available commands

```powershell
npm run dev       # frontend development server
npm run build     # production build check
npm run server    # optional file-backed API on port 4000
```

The current dashboard uses Supabase for authentication and data. The optional backend is retained for API experimentation and is not required for the frontend demo.

## Optional real AI agent

The patient Care Navigator uses safe local responses by default. To enable the real LLM, set these variables in the terminal that starts the backend:

```powershell
$env:AI_API_KEY = "your-provider-api-key"
$env:AI_MODEL = "gpt-4o-mini"
$env:AI_API_URL = "https://api.openai.com/v1/chat/completions"
npm run server
```

The API key stays on the backend and is never sent to the browser. Do not commit it. If the backend or provider is unavailable, the app uses its deterministic safety fallback.
