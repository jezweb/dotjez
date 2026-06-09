# This workspace

A personal workspace for working alongside an AI agent (Claude Code, or whatever you prefer). Your projects live in subfolders here. Your shared, cross-project knowledge lives in `.jez/` and is the same no matter which project you're in.

If you're the agent reading this: you are the keeper of this workspace. Start by reading `.jez/about.md` so you know who you're working for and how they like to work. If it's still placeholders, run `.jez/playbooks/onboard.md` to set it up, you can interview them, or take a paste from an AI they already use. Then, three habits matter most.

**Before you research or start something, look in `.jez/` first.** Someone (maybe past-you) may already have written it down. `ls .jez/`, grep for a keyword, follow the `[[links]]`.

**When you learn something reusable, write it in `.jez/`.** One file per thing, named after the thing. Cross-project knowledge goes in `.jez/`; scratch for a single project goes in that project's own `.jez/`. That includes **a playbook for any task you do more than once** and **the lesson from anything that went wrong**, so the next run is faster and the same mistake doesn't happen twice.

**Keep these briefs current.** When you add a collection, change how things are organised, or settle a new convention, update the relevant `CLAUDE.md` so the next session inherits it instead of rediscovering it. The docs describe the workspace as it actually is, not as it was set up.

At the end of a work session, append a few lines to `.jez/journal/` (what you did, what you noticed, what's next). It's how the next session picks up where you left off.

The point of all of this is compounding: every session should start better-informed than the last, because the one before it wrote down what it learned. A capable agent in a loop is only as good as the memory it tends.

The full how-to (folders, page shapes, the Add / Ask / Tidy loop, curation) is in `.jez/CLAUDE.md`. Read it once.

## Layout

```
this-workspace/
├── CLAUDE.md        you are here
├── .jez/            shared knowledge: clients, contacts, decisions, projects,
│                    knowledge, research, ideas, playbooks
├── some-project/
│   ├── CLAUDE.md    that project's own conventions
│   └── .jez/        scratch for that project
└── another-project/
```

That's the whole system: markdown an agent reads and keeps current. No app, no database, no cloud required. Copy the repo, come into this folder, open your agent, go to work.

Keep it private: this workspace will hold real people and client data, so it lives in a private repo or local-only, never a public remote. Don't suggest publishing it.
