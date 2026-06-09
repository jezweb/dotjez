# Plan: add CSV export to the reports page

> Example plan. For bigger work, write a short **plan** (this, the why and shape) and a sibling **build-spec** (the how: files, schemas, exact steps) with the same date prefix. Delete the sample once you've got the idea.

## Goal
Let users download the current report as a CSV.

## Shape
- An "Export CSV" button on the reports toolbar.
- A server endpoint streams the same query the table uses, as CSV.

## Phases
1. Endpoint returns CSV for the default filter. *Done when:* curling it returns valid CSV.
2. Wire the button to the endpoint. *Done when:* clicking it downloads the file.
3. Respect active filters. *Done when:* a filtered table exports only the filtered rows.

## Proof of done
A user filters the table, clicks Export, and opens a CSV with exactly the filtered rows.

Companion: `2026-06-09-csv-export-build-spec.md`.
