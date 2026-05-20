# ClimateShield
Autonomous climate-risk operations platform — five vertical products (PropertyShield, AgShield, RealtyShield, GridShield, SovCatShield) built from one codebase. ClimateShield ingests climate signals, matches them against policy thresholds, designs and executes mitigations, and produces audit-grade regulatory disclosures, all in a continuous 6-stage pipeline.
## What it does
1. **Climate Signals** — ingests feeds (NOAA, ECMWF, Sentinel, RMS, Verisk, IoT, FEMA, etc.) and writes typed `events`.
2. **Detection** — matches events against the policy graph; opens a `breach` with confidence + rationale.
3. **Analysis** — six LLM agents reason over the breach (event-forensics, policy-match, mitigation-designer, red-team-adversary, execution-pilot, audit-recorder).
4. **Execution** — ranks mitigations from the vertical's playbook, auto-fires pre-approved actions, records expected loss avoided.
5. **Compliance** — generates TCFD / ISSB / SEC / CSRD / NAIC disclosure packs and appends a hash-chained audit entry.
6. **Resilience** — recomputes outcome KPIs (median detection, autonomous mitigation %, loss avoided, audit coverage, resilience score) live from the database.
Switching vertical in the AppShell selector swaps the policy library, signal-source weights, mitigation playbook and accent color — the same demo button produces a different, correct outcome per vertical.
## Tech stack
- **TanStack Start v1** (React 19, Vite 7) — SSR + file-based routing under `src/routes/`
- **TanStack Router** + **TanStack Query**
- **Tailwind CSS v4** with semantic tokens in `src/styles.css` (oklch)
- **shadcn/ui** + Radix primitives
- **Lovable Cloud** (managed Supabase) — Postgres, Auth, Realtime, Storage
- **Lovable AI Gateway** — Gemini / GPT models via forced-tool calls (no user API key needed)
- **Zod** schemas as the contract between agents, DB and UI
- **pdf-lib** for disclosure-pack generation
- Deployed to **Cloudflare Workers** (`workerd` runtime, nodejs_compat)
## Project layout
```
src/
  routes/                 file-based routes (TanStack Start)
    _app.*.tsx            authenticated app shell pages (dashboard, policies, events, audit, compliance)
    api/public/*          webhooks + cron endpoints (disclosure-generator, red-team-scan)
  components/             AppShell, OutcomesDashboard, FederatedCohortMap, VerticalSelector, ...
  lib/
    agents/               6 agents + shared runner, audit chain, Lovable AI client
    flow-orchestrator.ts  drives the 6-stage demo pipeline against the live DB
    vertical-config.ts    per-vertical signals / playbook / accent / demo payload
    schemas.ts            Zod schemas for every domain object
  integrations/supabase/  auto-generated client + auth middleware (do not edit)
supabase/migrations/      versioned SQL schema + seeds
```
## Server-side logic
App-internal logic is implemented as **TanStack server functions** (`createServerFn`) — see `src/lib/agents/agents.functions.ts`. External webhooks and scheduled jobs live under `src/routes/api/public/`. There are no Supabase Edge Functions on this stack.
## Database
Core tables: `events`, `policies`, `breaches`, `mitigations`, `audit` (hash-chained), `agent_log`, `disclosures`, `cohort_pulses`, `red_team_results`. Realtime is enabled on the tables the dashboard subscribes to; KPI views recompute automatically as rows arrive.
Multi-tenancy: `policies.tenant_id` is present but not RLS-enforced (single-tenant demo).
## Running locally
```bash
bun install
bun run dev      # vite dev
bun run build    # production build
```
Environment is auto-provisioned by Lovable Cloud — `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` are populated in `.env` automatically. Do not edit `.env`, `src/integrations/supabase/client.ts`, or `src/integrations/supabase/types.ts` — they are regenerated.
## Demo flow
Open `/dashboard`, pick a vertical in the header selector, hit **Inject demo event**. The orchestrator writes a real `event`, opens a `breach` against that vertical's policy, inserts ranked `mitigations`, appends an `audit` row, and the dashboard KPIs update live via Realtime. The federated cohort map shows pulses from peer tenants; 3+ pulses sharing peril + region trigger an early-warning banner. A scheduled red-team adversary runs hourly in shadow mode and raises a "blind spot detected" banner when it finds a high-confidence breach that existing detective controls would have missed.
## License
Proprietary — internal demo.
