# .jez — your knowledge hub

The shared, cross-project knowledge for this workspace: clients, contacts, decisions, projects, patterns, research, ideas. It sits at the workspace root and every project draws on it. Read here before researching from scratch; write here when you learn something that isn't tied to one project.

(The short version of how to use it is in the workspace-root `CLAUDE.md`. This is the detail.)

## The loop

**Add** — learned something reusable? Write it as one file in the folder that fits. Name it after the thing it's about (`acme-digital.md`, `meeting-recordings-auto-delete.md`), not the date. If a page already covers the topic, update that page rather than making a near-duplicate.

**Ask** — before starting, look here first: `ls` the folder, grep for a keyword, follow the `[[links]]`.

**Tidy** — when you spot something stale or wrong, fix it or delete it. Wrong knowledge is worse than none.

## Where things go

| It's about... | Folder | Example file |
|---|---|---|
| A client or organisation | `clients/` | `acme-digital.md` |
| A person or relationship that spans clients | `contacts/` | `key-relationships.md` |
| A choice you made, and why | `decisions/` | `2026-06-09-use-xero-for-invoicing.md` |
| A project (a one-pager; the work itself lives in its own folder) | `projects/` | `acme-brand-refresh.md` |
| A pattern or gotcha across projects | `knowledge/` | `meeting-recordings-auto-delete.md` |
| A repeatable task | `playbooks/` | `new-client-onboarding.md` |
| An investigation or scan | `research/` | `competitor-pricing-scan-2026-06-09.md` |
| An idea for later | `ideas/` | `dashboard-compare-view.md` |
| What I did this session (running log) | `journal/` | `2026-06-09.md` |
| Not filed yet | `inbox/` | anything |

Plus `about.md` at the hub root: who you are, the business, your goals, and how you like to work. Fill it in first (the `onboard` playbook does this), it's the context the agent reads to act in your interest. When it gets rich, it grows into an `about/` folder (`voice.md` for how you write with "I'd love / I'd hate" examples, `expertise.md` for when to be brief vs thorough, `business.md`, `people.md`), earned, not shipped empty.

One question decides hub vs project: *will another project ever care about this?* Yes goes here in the hub; no goes in that project's own `.jez/` (see `sample-project/`).

## How a page looks

One topic per file, named in **kebab-case** after the thing it's about (`acme-corp.md`, not `Acme Corp.md` or `acme (old).md`). The first two lines should tell a reader whether it's relevant. Lead with the point, then back it up. **To add a new one, copy the example already in that folder** — the examples are the templates.

Frontmatter is optional, but when you use it (most useful on `clients/`, `projects/`, anything you'll come back to), this is the shape:

```yaml
---
title: Acme Corp — billing setup
created: 2026-06-09
updated: 2026-06-09
status: current   # current | needs-review | archived
---
```

`updated` is the field that earns its keep: it gives **Ask** a recency signal and **Tidy** a sort key. Two habits ride with it: bump `updated` whenever you edit a note, and when **Ask** turns up a note older than ~90 days, verify it before relying on it (mark it `status: needs-review` if you can't). Playbooks and short notes often need no frontmatter at all, don't fill in a form for its own sake.

Link related pages with double brackets, using the other file's name without `.md`:

```
See [[acme-digital]] for the billing quirk.
```

The slug matches a filename, so you (or the agent) can grep or open it. For a precise pointer an agent will follow, a full path also works: `.jez/clients/acme-digital.md`.

## The journal

`journal/YYYY-MM-DD.md` is the agent's running log: a few lines at the end of a work session, *what I worked on / what landed / what I noticed / what's next*. It's how the next session picks up where the last one left off, files are durable, the conversation isn't.

Keep three things separate, they answer different questions:

- **`journal/`** — what *happened* (narrative, dated, append-only).
- **`SESSION.md`** (in a project) — where that project *stands right now* (a short breadcrumb, kept current).
- **`about.md`** — who you *are* (changes rarely).

You don't need agent folders for this. There's one agent; its log is just a dated collection in the wiki, like `research/`.

## Playbooks are your skills

A playbook in `playbooks/` is a procedure the agent reads when the task comes up again, the lean version of a skill. Write one the moment a task recurs, or when something went wrong and you worked out the right way. Capturing it is what stops the same mistake twice and makes the next run faster. A realignment or a near-miss is a playbook waiting to be written.

You don't need machinery to make this "automatic": it's a habit the agent runs at the end of work ("did anything recur or go wrong? capture it"), and you can make it periodic with a scheduled pass (`/loop`, cron, or a `reflect`-style routine) if you want.

When a playbook gets used often enough that you want it to load itself, graduate it to a real Claude Code skill (a `SKILL.md` the harness surfaces automatically). Until it earns that, a markdown playbook the agent reads is enough.

## One file, or a folder?

Start everything as one file. When a single client or project accumulates several sub-documents, give it its own folder and split them out:

```
clients/acme-digital.md         ← most clients: one file
clients/big-client/             ← a big one earns a folder
  big-client.md                    the overview
  hosting.md                       ancillary detail
  history.md
```

Same for projects. Dated things (research, decisions) carry the date in the filename, not a folder. Don't pre-build folders; let them earn it.

## Tending the wiki

This is the part that keeps it worth reading. Rules of thumb, in priority order:

- **Update before you duplicate.** Before adding a file, check whether one already covers it (`ls`, grep). Fold new detail into the existing page instead of making a near-twin.
- **Make folders when they earn their place, anywhere.** The shipped folders are sensible defaults, not a fixed set, create what your work needs. This rule is the same wherever folders live: here in the hub, in a project's own `.jez/`, or inside a folder like `artifacts/`. Don't pre-build empty ones. A new folder earns itself once about three things belong in it; until then keep them in `inbox/` or the nearest existing folder. Split a folder into sub-folders past ~50 files, by topic, never by date.
- **Keep the briefs current.** When you change how things are organised or settle a new convention, update this file. Give a folder its own short `CLAUDE.md` once it grows its own rules (a naming scheme, a sub-structure, a collection-specific gotcha); until then the example file is enough. A good folder `CLAUDE.md` is brief: what's here, the local rule or gotcha, and a pointer to deeper docs, not a copy of them. Stale instructions are worse than none.
- **Promote, don't pile up.** A note starts in `inbox/`, matures into `ideas/` or `research/`, and when it's solid moves to `knowledge/` or `playbooks/`. Move, don't copy. If you promote a finding out of a research file, mark that file `status: promoted` so nobody mistakes it for live.
- **Lean on names, not hand-kept index files.** `ls` + grep + `[[links]]` is enough up to a point. When a folder gets big enough that scanning is real work, the fix is to **split by topic** (above) so each folder is small again, plus the `updated` field so grep/sort surfaces what's recent. Don't hand-maintain an `_index.md`: it goes stale the moment you forget, and a wrong index is worse than none. If you genuinely want a folder index, have a periodic pass *generate* it from the files' frontmatter and never hand-edit it (the way a runtime would). Index = generated, or not at all.

The discipline is "one more file usefully filed," not "design the perfect structure."

You can do all of this by hand as you work, and that needs nothing. When the wiki gets big, the boring parts, flagging notes past ~90 days as `needs-review`, regenerating a folder index, spotting orphans, are what a **scheduled pass** is for: a cron, a `/loop`, a caretaker skill, or a fuller runtime if you graduate to one. It reads the `updated`/`status` frontmatter and does the sweep so you don't have to. dotjez needs none of it to start; reach for it only when tending by hand stops keeping up.

## Secrets

Working keys and dev creds can live in `secrets/`, which is **never committed to git**. High-stakes credentials (account-root, payments, identity recovery) belong in a password manager, never a file. See `secrets/README.md`.
