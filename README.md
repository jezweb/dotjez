# dotjez

A copy-and-go workspace for working alongside an AI agent. A small set of folder primitives for a computer that's organised to run agents as companion workers, whatever your job is.

It's just markdown in folders. No app, no database, no cloud. Clone it, come into the folder, open Claude (or whatever agent you use), and go to work. The agent reads your knowledge, helps you, and writes back what it learns.

## The idea

Keep what you learn as markdown files an AI can read and keep up to date. One file per thing: a client, a decision, a project, a gotcha, an idea. Over time the folder *compounds*. Instead of re-researching, you and the agent read what's already written and add to it. It works the same whether your work is accounts, sales, support, product, ops, or code.

**You don't need to be a developer.** If you can copy a folder and chat with an AI agent, this is for you. Not comfortable in a terminal? Point your agent at this repo and ask it to set you up.

Three moves, that's the whole loop:

| Move | What it means |
|---|---|
| **Add** | Learned something reusable? Write it as a new file, or update the one that's already there. |
| **Ask** | Starting something? Read what's already here first: `ls`, grep, follow the `[[links]]`. |
| **Tidy** | Now and then, fix what's stale and delete what's dead. Wrong notes are worse than none. |

If you've seen Andrej Karpathy's "LLM wiki" or the DOX pattern, this is the same idea kept small (links at the bottom).

## What's a workspace?

Just the folder where you keep your projects. Put it wherever suits you, and name it whatever you like. Some clean choices:

```
~/workspace            simple, home-level
~/Documents/workspace  if you'd rather keep it under Documents
~/code/workspace       wherever your projects already live
```

The repo is called `dotjez` on GitHub, but on your machine it's just your workspace folder. Nothing inside cares what you name it. Inside, you end up with:

```
~/workspace/                  your workspace (this repo, cloned)
├── .jez/                     cross-project knowledge hub  (shared by everything below)
├── some-client-site/         a project
│   └── .jez/                 scratch just for this project
└── another-project/
    └── .jez/
```

So there are two scopes, and you want both:

| Scope | Lives at | Holds |
|---|---|---|
| **Workspace hub** | `<workspace>/.jez/` | Knowledge across all your work: clients, patterns, playbooks, research, ideas |
| **Project** | `<workspace>/<project>/.jez/` | Scratch for one project: plans, audit notes, screenshots, throwaway scripts |

One question decides which: *will another project ever care about this?* Yes goes in the hub. No goes in the project.

## Get started

**Option A: clone it as a fresh workspace**

Clone it to whatever folder you want to be your workspace (the name is yours to pick):

```
git clone <this-repo-url> ~/workspace          # or ~/Documents/workspace, ~/code/workspace, ...
cd ~/workspace
```

Then make it yours: re-point git at your own private repo (so your real client knowledge never pushes back to the shared template), and delete `sample-project/` once you've seen the pattern.

```
git remote remove origin
# optional: git remote add origin <your-own-private-repo>
```

**Option B: copy the bits into a workspace you already have**

```
cp -r dotjez/.jez            your-workspace/.jez
cp -r dotjez/sample-project/.jez   your-workspace/a-real-project/.jez
```

Either way: the root `CLAUDE.md` is the operator brief (it tells the agent it's the keeper of this workspace), and `.jez/CLAUDE.md` is the detail on how it's organised. Claude Code reads both automatically when you work in the folder. The example files (`acme-digital.md`, `new-client-onboarding.md`, and friends) show you the shape, so to add a real one you just copy the example. Read them, then make them yours.

## For the agent

If you're an AI agent pointed at this repo, here's your job.

- The workspace-root `CLAUDE.md` is your operator brief; `.jez/CLAUDE.md` is the detail. Read both. (In Claude Code they load automatically once you're working in the folder.) Don't reinvent the conventions, follow what's there.
- Start by reading `.jez/about.md` to learn who you're working for and how they like to work. If it's still placeholders, offer to fill it in with them, it's the most useful first thing you can do.
- Then run the loop: **Ask** (check `.jez/` before researching), **Add** (write what you learn, one file per thing), **Tidy** (fix or delete what's stale, keep the briefs current).
- Setting up a new person? Help them clone or copy this into a workspace folder, fill in `about.md` together, and use the sample files (each carries a "copy the shape" banner) as templates, copy from them, then delete the samples.

## What's in here

```
dotjez/                   ← clone this and it becomes your workspace
├── README.md                (for the person setting it up)
├── CLAUDE.md                the operator brief: tells the agent it's the keeper of this workspace
├── .jez/                    your cross-project hub
│   ├── CLAUDE.md               how it's organised, day to day (read this)
│   ├── about.md               who you are + how you like to work (fill this in first)
│   ├── clients/               one file per client or organisation
│   ├── contacts/              people + relationships that span clients
│   ├── decisions/             choices you made, and why (lightweight ADRs)
│   ├── projects/              a one-pager per project (the work lives in its own folder)
│   ├── knowledge/             patterns + gotchas that span projects
│   ├── playbooks/             "how we do X"
│   ├── research/              dated investigations
│   ├── ideas/                 half-formed concepts
│   ├── inbox/                 somewhere to drop notes you'll file later
│   └── secrets/               the rule for where credentials go (not the credentials)
└── sample-project/          what a project with its own .jez looks like
    ├── CLAUDE.md
    ├── SESSION.md              living progress doc for multi-session work
    └── .jez/                   plans / research / audits / artifacts / screenshots / scripts
```

## Why these folders (and not others)

A default folder has to clear a high bar: useful to almost everyone, across almost any job. Everything else the agent creates on demand (it knows how to, and when, see `.jez/CLAUDE.md`), so shipping a niche folder by default would just be clutter.

**In by default:** `clients/ contacts/ decisions/ projects/ knowledge/ playbooks/ research/ ideas/` (the things nearly everyone accumulates), plus `inbox/` (drop the unfiled here), `secrets/` (the keep-out rule), and `about.md` (who you are, so the agent acts in your interest).

**Left to make-when-needed**, so the workspace starts clean:

| Not a default | Why |
|---|---|
| `meetings/`, `drafts/`, `notes/` | fit `research/` or `inbox/` until they earn their own folder |
| `tasks/` / `todo/` | you probably already have a real tool for this |
| `archive/` | the habit here is update-or-delete, not stash |
| per-project `data/`, `assets/`, etc. | the agent adds these to a project when it needs them |

The rule for both columns is the same: **a folder earns its place once about three things belong in it.** The agent makes them as your work grows.

## Where the idea comes from

- Andrej Karpathy's LLM wiki: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- DOX: https://github.com/agent0ai/dox
