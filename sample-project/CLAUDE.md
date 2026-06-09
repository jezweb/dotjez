# Sample Project

> Example project-level `CLAUDE.md`. Claude Code loads it automatically when you work in this folder. Replace it with your real project's details, then delete this note.

## What this is
A line or two: what the project does, who it's for, what it's built on.

## Conventions
- Where the source lives, how it's built, how it's deployed.
- Any naming or structure rules specific to this repo.

## Gotchas
- The non-obvious things that trip up the next person, or the next session.

## Where project notes go
- `SESSION.md` (project root) — the living progress doc for multi-session work; the first thing a new session reads
- `.jez/plans/` — plans and build-specs (dated, e.g. `YYYY-MM-DD-feature-plan.md` + a `-build-spec.md` sibling for bigger work)
- `.jez/research/` — digging specific to this project
- `.jez/audits/` — review and audit findings
- `.jez/artifacts/` — the catch-all for everything else (working notes, comparisons, dumps)
- `.jez/screenshots/` — images and recordings (gitignored)
- `.jez/scripts/` — one-off scripts for this project

These subfolders are defaults, not a fixed set. Make new ones when the project needs them: a marketing project might want `drafts/` and `assets/`; an event might want `vendors/` and a `runsheet/`. Same rule as the hub, a folder earns its place once about three files belong in it; don't pre-build empties — this sample's `.jez/` carries only `plans/`, because that's the one its own work earned.

Anything here that turns out to matter across projects should move up to your workspace `.jez/`.

**Commit policy:** in a private repo, commit the markdown and scripts so the context travels with the code, and gitignore the binaries (`.jez/screenshots/`, image/video files). In a public repo, gitignore `.jez/` entirely and opt in per file.
