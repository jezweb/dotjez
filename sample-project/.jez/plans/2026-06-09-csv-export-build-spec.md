# Build spec: CSV export

> The "how" sibling to `2026-06-09-csv-export-plan.md`. A plan is for agreeing the shape; a build-spec is for building without re-deciding anything. Small features don't need both — split them only when someone will rebuild context cold later.

## Files
- `src/routes/reports.ts` — add `GET /api/reports/export` returning `text/csv`.
- `src/components/ReportsToolbar.tsx` — add the Export button.

## Endpoint
- Reuse the existing report query builder; serialise rows to CSV.
- Read the same filter params the table uses, so export matches what's on screen.
- Header row from the column definitions; stream rather than buffer for large reports.

## Button
- Calls the endpoint with the current filter state, triggers a download.
- Disabled while a report is loading.

## Verify
1. `curl '/api/reports/export'` returns valid CSV with a header row.
2. Click Export with no filter: full dataset downloads.
3. Apply a filter, click Export: only filtered rows in the file.
