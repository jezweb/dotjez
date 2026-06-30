---
name: kanban
description: Use when you want a lightweight, claimable task board that lives in the repo as markdown, for parallel multi-agent work or your own backlog, where a card is a file and the folder it sits in is its status. Covers the folder-board layout, claiming and completing by moving the file, worktree-safe concurrency for a fleet, frontmatter conventions, discoverability one-liners, and an optional zero-dependency local web UI to view and drag cards. Triggers, "kanban", "task board", "track parallel agent work", "claimable work queue", "what's in flight".
---

# Kanban: a task board that is just folders

A card is a markdown file. The folder it sits in *is* its status. Move the file, move the card. That's the whole system: no app, no database, no API, no SaaS login. It lives in the repo, diffs in git, works offline, and a human and a fleet of agents read and write the exact same board.

Reach for this when work splits into many similar units that get picked up one at a time, especially when more than one agent (or you-plus-agents) work the queue in parallel. For a single ongoing role, use `run-a-role-agent`; for narrative continuity across sessions, the journal already does that. This is for *claimable units of work in flight*.

## Layout

```
<board>/
  board.md            the brief: what this batch is, the bar, the done-definition
  todo/   <card>.md    queued, unclaimed
  doing/  <card>.md    claimed and in progress
  done/   <card>.md    finished, with its result recorded
```

The columns are just subfolders, so the set is yours: `backlog/ todo/ doing/ review/ done/` if the work wants a review gate. The viewer auto-detects whatever columns exist. Keep `board.md` at the board root so any agent that wanders in absorbs the batch brief before picking up a card.

**Earn the folder.** A board exists only once real work fills it. No pre-created empty boards, no speculative columns, same rule as everything else in the workspace.

## The loop, per card

1. Read `board.md`, absorb the brief and the bar.
2. Pick one unclaimed card from `todo/`.
3. **Claim it** by moving the file and stamping who/when:
   ```bash
   git mv <board>/todo/<card>.md <board>/doing/<card>.md
   ```
   Add `agent:` and `claimed_at:` to the card's frontmatter, commit. The move *is* the lock: once it's in `doing/` with your name on it, no one else picks it up.
4. Do the work the card describes.
5. **Complete it** by moving it on and recording the result:
   ```bash
   git mv <board>/doing/<card>.md <board>/done/<card>.md
   ```
   Add whatever proves it shipped (a URL, a one-line note of what was delivered), commit.

Use `git mv` rather than a plain move so the status change lands in history, blame and diffs stay meaningful, and the move survives a worktree merge. A plain `mv` works too if the board isn't in git.

## Card shape

A card is a brief, not a ticket stub. Frontmatter for the machine-readable bits, body for the brief the agent works from.

```markdown
---
agent:                 # who claimed it (added at claim time)
claimed_at:            # ISO date (added at claim time)
result:                # what shipped (added at completion)
---

# <card title>

<the brief: what to build/do, the inputs, the acceptance check that proves it's done>
```

Earn the frontmatter fields, don't pre-declare a schema. Add `result:` / `url:` / `blocked_by:` when a card actually needs them. The body carries the real work; a good card points the agent at the standing rules so it inherits the bar without re-deriving it.

## Concurrency for a fleet

Multiple agents work one board safely when each works in its **own git worktree and branch**, opening a PR per card. Agents pick *different* cards, so file moves happen in separate worktrees and can't collide; PRs merge serially. The folder-as-status model is what makes this clean: there's no shared mutable index to contend on, just files moving between directories. (See `orchestrate-agents` for the fan-out around this, and pre-assign each agent a distinct card up front rather than letting them self-select into the same one.)

## Discoverability

The board is greppable, which is the point.

| Question | Command |
|---|---|
| What's in flight? | `find <root> -path '*/doing/*.md'` |
| What's queued? | `ls <board>/todo/` |
| What's done? | `ls <board>/done/` |
| Which board has the most queued? | `for d in <root>/*/todo; do echo "$(ls "$d" \| wc -l) $d"; done \| sort -rn` |
| Who's on what? | `grep -rl '^agent:' <root>/*/doing/` then read the frontmatter |

## A board to look at

`board.mjs` (in this skill folder) is a zero-dependency local web view: run `node board.mjs <root>` and open the printed URL to see the columns, read each card, and drag cards between them (the drag does a `git mv` when the board is in a repo, a plain rename otherwise). It polls the disk, so cards an agent moves show up live. It's a convenience for a human glance and the demo; the board works completely without it, because it's only ever files.

The failure this prevents: work that lives in a chat transcript or a SaaS board no agent can read, a fleet that double-claims the same task, and "what's the status of everything" being a question only a human can answer instead of one `find` away.
