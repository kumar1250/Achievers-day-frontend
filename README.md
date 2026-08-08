# Placements Portal — Frontend (React + Vite + Tailwind)

Adapted from the original Graduation Day frontend, now themed around
**Placement Felicitation Day** and driven by placements data.

## What changed from the original project
- `api.js` — configurable `VITE_API_BASE` (defaults to
  `http://localhost:8000/api` for local dev; set an env var for prod)
- `StudentLookup.jsx`, `RegisterSection.jsx` — detail fields now show
  Regd No, Branch, Gender, Contact, Company, IT/Non-IT, Salary (LPA)
  instead of Father Name / Class Awarded / CGPA / Month & Year / Email
- `Acknowledgement.jsx` / `AcknowledgementSection.jsx` — the printable
  PDF certificate now shows placement details and "Placement
  Felicitation Day" branding
- `Directory.jsx` — full placements directory table (Branch, Company,
  IT/Non-IT badge, Salary) with search across Regd No / name / branch
  / company
- `AdminDashboard.jsx` — added a **Placement Analytics** section: IT
  vs Non-IT counts, unique companies, average/highest salary, and a
  branch-wise placed-students bar chart, alongside the existing
  registration stats
- `Home.jsx` — hero copy, steps, and gallery captions reworded for
  Placement Felicitation Day
- All Tailwind theming, fonts, animations, and layout are unchanged

## Setup
```bash
npm install
npm run dev       # local dev server
npm run build      # production build
```

Create a `.env` (or `.env.local`) with:
```
VITE_API_BASE=http://localhost:8000/api
```
(or your deployed backend URL).

## Routes
- `/` — public placements lookup + Felicitation Day registration
- `/bvc-admin` — Admin Dashboard + Placements Directory
