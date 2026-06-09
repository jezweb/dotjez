# .jez — your knowledge hub

The shared, cross-project knowledge for this workspace: clients, contacts, decisions, projects, patterns, research, ideas. It sits at the workspace root and every project draws on it. Read here before researching from scratch; write here when you learn something that isn't tied to one project.

(The short version of how to use it is in the workspace-root `CLAUDE.md`. This is the detail.)

## The loop

**Add** — learned something reusable? Write it as one file in the folder that fits. Name it after the thing it's about (`acme-digital.md`, `meeting-recordings-auto-delete.md`), not the date. If a page already covers the topic, update that page rather than making a near-duplicate. Don't invent: if you're unsure of a fact, write what you know and flag the gap (`status: needs-review`), never a guess dressed as truth, a confident wrong note is worse than a gap. Two traps that don't *feel* like unsureness: your built-in knowledge has a date, so check a live source before filing anything that changes over time (prices, rates, rules), stale recall feels exactly like knowing; and a question you can't answer yet is worth two lines on the relevant page (what's unknown, why it matters) rather than letting it evaporate with the conversation.

**Ask** — before starting, look here first: `ls` the folder, grep for a keyword, follow the `[[links]]`.

**Tidy** — when you spot something stale or wrong, fix it or delete it. Wrong knowledge is worse than none. And when a note disagrees with what you observe live, the observation wins: update the note, never work around fresh evidence to honour a stale file.

## Where things go

| It's about... | Folder | Example file |
|---|---|---|
| A client or organisation | `clients/` | `acme-digital.md` |
| A person or relationship that spans clients | `contacts/` | `key-relationships.md` |
| A choice you made, and why — including choices to *stop* using something | `decisions/` | `2026-06-09-use-xero-for-invoicing.md` |
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

## Playbooks: how we work

A playbook in `playbooks/` is a **documented way of working**, "how we onboard a client", "how we run a role agent", that the agent reads when the situation comes up. It's the unit that lets a team ship its working practices into a workspace: portable, editable markdown, not code, not config. Write one the moment a task recurs. When something *went wrong*, the lesson itself belongs in `knowledge/` (the wrong-then-right gotcha); promote it to a playbook only when it implies a repeatable way of working worth following each time, otherwise a one-line guard in the relevant playbook is enough. Either way, capturing it stops the same mistake twice and makes the next run faster. Write it as the goal and what to watch for, not a rigid step-by-step script, a capable agent follows intent better than instructions, and an over-specified playbook ages into a brittle recipe.

**A playbook is not a skill.** A skill (a Claude Code `SKILL.md`) is a *capability* the harness loads and can invoke; a playbook is *process knowledge* that lives in your workspace as content. Different shape, different home, different purpose. Most ways of working are happier as playbooks, a human can read and edit them and they travel with the workspace. If you genuinely want a procedure to load itself automatically, that's a skill, a separate harness artifact, not a playbook with extra steps.

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
