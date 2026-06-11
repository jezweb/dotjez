# dotjez

A copy-and-go workspace for working alongside an AI agent. Your knowledge lives as plain markdown the agent reads and keeps up to date, so you never solve the same thing twice. **You don't need to be a developer**, and it works for any job, not just code.

No app, no database, no cloud. It's just folders. Clone it, open your agent in the folder, and go.

## The idea

Keep what you learn as one file per thing: a client, a decision, a project, a gotcha, an idea. Over time it *compounds*, instead of re-researching, you and the agent read what's already there and add to it. Three moves, the whole loop:

- **Add** — learned something reusable? Write it down, or update the file that's already there.
- **Ask** — starting something? Check what's already here first.
- **Tidy** — now and then, fix what's stale and bin what's dead. Wrong notes are worse than none.

## Start

The easy way: open your agent in the folder and say **"help me set up this workspace."** It interviews you, or borrows a profile from an AI you already use (ChatGPT, Claude, Gemini), and writes your `about.md`. That's the whole setup.

To get the folder:

```
git clone https://github.com/jezweb/dotjez ~/workspace && cd ~/workspace
```

Name it whatever you like; nothing inside cares. Once it holds real client data, keep it **private**, don't push your filled-in workspace to a public remote.

## What the first session looks like

```
You    →  "help me set up this workspace"
Agent  →  interviews you (or borrows a profile from an AI you already use),
          writes about.md.

You    →  "new client signed — Acme Digital, web + email, contact Jane"
Agent  →  copies the clients/ example to clients/acme-digital.md, fills it in.

   ...you work...

Agent  →  at the end, logs a line to journal/: what you did, what's next.
```

Next time, the agent reads `about.md` and the last journal entry first, so it already knows who you are and where you left off. Every session starts ahead of the last.

## For the agent

Your brief is `CLAUDE.md` (how to operate this workspace) and `.jez/CLAUDE.md` (the detail on how it's organised). Both load automatically in Claude Code, read them and follow them, don't reinvent the conventions. In short: read `.jez/about.md` to learn who you serve (run `.jez/playbooks/onboard.md` if it's still blank), then run **Ask → Add → Tidy** and keep the briefs current.

## What's in here

```
dotjez/                  ← clone this; it becomes your workspace
├── CLAUDE.md               the agent's brief (how to operate this workspace)
├── .jez/                   your knowledge hub, shared across every project
│   ├── CLAUDE.md              how it's organised (the detail)
│   ├── about.md              who you are + how you like to work (filled in first)
│   ├── clients/  contacts/  decisions/  projects/
│   ├── knowledge/  playbooks/  research/  ideas/
│   ├── journal/              the agent's running log, per session
│   ├── inbox/                somewhere to drop notes to file later
│   └── secrets/              where credentials go (and don't)
└── sample-project/         what a project's own .jez looks like
```

Each folder ships one worked example, copy it to make a real one. A `.jez` works at any level: the workspace has one (knowledge across all your work), and each project gets its own (scratch for that project). The question that decides where something goes: *will another project ever care about this?* The agent makes new folders as your work grows; it doesn't need them up front.

## Back it up

Your workspace is just files on your Mac, so back them up. [**dotbackup**](https://github.com/jezweb/dotbackup) is the sibling tool: a small desktop app that backs up your `.jez` workspace (and any other folders) to **your own** Cloudflare R2, encrypted, on a schedule. You own the bucket and the keys, same spirit as dotjez.

## Credit

The same idea as Andrej Karpathy's [LLM wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and the [DOX](https://github.com/agent0ai/dox) pattern, kept small.
