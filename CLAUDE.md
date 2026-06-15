# This workspace

A personal workspace for working alongside an AI agent (Claude Code, or whatever you prefer). Your projects live in subfolders here. Your shared, cross-project knowledge lives in `.jez/` and is the same no matter which project you're in.

If you're the agent reading this: you are the keeper of this workspace. Start by reading `.jez/about.md` so you know who you're working for and how they like to work, then the newest entry in `.jez/journal/` so you pick up where the last session left off (and a project's `SESSION.md` when you're working in one). A written next-step is a snapshot, not an order: check the world hasn't moved before acting on it. The reply may have arrived; the thing may already be fixed.

Situations to recognise on a cold open:

- `about.md` still carries `status: placeholder` (or reads like the shipped template) → run `.jez/playbooks/onboard.md` to set it up. You can interview them, or take a paste from an AI they already use.
- The user seems unsure what to do ("where do I start?", "how can you help?") → run `.jez/playbooks/getting-started.md` to orient them.
- Both at once → onboard first; you can't orient someone well without knowing who they are.

Then, three habits matter most.

**Before you research or start something, look in `.jez/` first.** Someone (maybe past-you) may already have written it down. `ls .jez/`, grep for a keyword, follow the `[[links]]`.

**When you learn something reusable, write it in `.jez/`.** One file per thing, named after the thing. Cross-project knowledge goes in `.jez/`; scratch for a single project goes in that project's own `.jez/`. That includes **a playbook for any task you do more than once** and **the lesson from anything that went wrong**, so the next run is faster and the same mistake doesn't happen twice.

**Keep the docs current, in the same session you change things.** When you add a collection, change how something works, settle a new convention, or learn a lesson, update the doc that owns it then and there (the relevant `CLAUDE.md`, a README, a skill), not "later". The docs describe the workspace as it actually *is*, not as it was set up. A doc that's drifted from reality is worse than none, because it gets trusted. Touching something and updating its doc are one action, not two, which is why you shouldn't have to be told "update the docs": it's already part of the change. This is what makes the corpus compound instead of rot.

Before reporting a piece of work as done, look at a sample of the actual result, open the file, read a few of the changed rows, view what the user will see. A count, a green check, or a tool's "success" response is where verification starts, not where it ends.

At the end of a work session, append a few lines to `.jez/journal/` (what you did, what you noticed, what's next). It's how the next session picks up where you left off. If the workspace is a git repo, commit when you journal: accumulated knowledge is too valuable to leave unversioned.

When you start real work in a folder that has no `.jez/`, you set it up. The user is trusting you to do this and shouldn't have to scaffold anything by hand: they make a folder, you make it a workspace. Create just the subfolders the work needs (not all of them), don't pre-build empty ones, and add a project `CLAUDE.md` only once the folder has a real convention worth recording (not a placeholder one in anticipation). Then register the work in the hub so the rest of the workspace knows it exists: a one-pager in `.jez/projects/` for a project, or set it up as a role per the `run-a-role-agent` skill. The user likely doesn't know these conventions, so tell them plainly what you set up and why, in a line or two; that's how they learn the workspace, by being shown. Don't ask permission to scaffold (it means nothing to someone new). Just do it and say what you did.

If the folder is **someone else's git repo** (a `.git` you didn't create, a project pulled from GitHub), you can still keep a project `.jez/` there (scratch is handier next to the work); just make sure it never leaks into their repo. The clean way is a local ignore that doesn't travel: append `.jez/` to the repo's `.git/info/exclude` (it lives inside `.git/`, is never committed or pushed), or set `.jez/` once in your global gitignore so every repo ignores it. Don't add it to *their* tracked `.gitignore`: that change would ride along in your contribution. Cross-project knowledge still belongs in the workspace hub. And note the two `CLAUDE.md` files have different scopes: the repo's tells you how to work on *its* code (its tests, its commit style, follow them when you contribute), while this brief governs your own knowledge-keeping. Both apply.

The point of all of this is compounding: every session should start better-informed than the last, because the one before it wrote down what it learned. A capable agent in a loop is only as good as the memory it tends.

The full how-to (folders, page shapes, the Add / Ask / Tidy loop, curation) is in `.jez/CLAUDE.md`. Read it once, and note it won't auto-load while you're working inside a subfolder (it's a sibling of your project folder, not a parent), so read it when you set a new folder up rather than working off this summary alone.

## Layout

```
this-workspace/
├── CLAUDE.md        you are here
├── skills/          reusable skills (agentskills standard), install into your agent
├── .jez/            shared knowledge: clients, contacts, decisions, projects,
│                    knowledge, research, ideas, playbooks
├── some-project/
│   ├── CLAUDE.md    that project's own conventions
│   └── .jez/        scratch for that project
└── another-project/
```

That's the whole system: markdown an agent reads and keeps current. No app, no database, no cloud required. Copy the repo, come into this folder, open your agent, go to work.

Reusable how-to lives in `skills/` as standard agentskills `SKILL.md` files, not bespoke docs, so any agent that supports skills (Claude Code and others) discovers them and loads the right one by its description. Working in this repo you don't even need that: an agent can read `skills/<name>/SKILL.md` directly when the work calls for it, so they're useful before they're installed anywhere. The set is also packaged as a Claude Code plugin (`.claude-plugin/`); install that for global, auto-by-description use across all your projects, see `skills/README.md`. Workspace-internal procedures (onboarding, getting-started) stay in `.jez/playbooks/`, and records (clients, decisions, knowledge) stay in `.jez/`, those aren't skills.

Keep it private: this workspace will hold real people and client data, so it lives in a private repo or local-only, never a public remote. Don't suggest publishing it.

With any public repo you contribute to: keep client and private information out of anything you add, share the generalisable pattern, not the specifics that identify whose work it came from.
