# Run a self-refining loop (an agent that works through a backlog and tunes itself)

> The deep end of [[run-a-role-agent]]. Reach for this when a role has *substantial repeated work*, more than one session can finish: enriching a few hundred records, working through a backlog, sweeping a large catalogue. The loop processes a slice each tick and, over days, improves its own procedure from what it learns. It runs on plain Claude Code, `/loop` (or a cron) is the heartbeat, sub-task agents do the batches. No cloud, no extra tooling.

Don't reach for it for one-off tasks, work that should be human-paced (a decision conversation), or a job whose procedure is already known and won't change. That's just [[run-a-role-agent]] with a cadence. This pattern earns its extra moving parts only when there's a real cohort to grind through *and* the work keeps teaching you how to do it better.

## The files it keeps

In the role's `.jez/`, a few files at different rhythms. Keeping them separate is the point: each changes at its own pace instead of churning one fat file.

| File | Holds | Changes |
|---|---|---|
| `loop.md` | the procedure (the tick steps below) | slowly, via the Refine step |
| `state.md` | cursor, in-flight batch, today's count, pending-learnings, pause flag | every tick |
| `reflections/YYYY-MM-DD.md` | append-only log of what each tick did and changed | every tick |
| `contract.md` | the prompt you hand sub-task agents (only if the loop spawns them) | slowly, via Refine |

## The tick

Each fire runs the same short procedure:

1. **Glance** — read `state.md`; if the pause flag is set, exit.
2. **Still running?** — if last tick's batch is in flight, exit clean. Don't pile on.
3. **Refine** — apply the learnings queued *last* tick to `loop.md`/`contract.md`, and note the change in today's reflection. (Why last tick's, not this one's, is below.)
4. **Process results** — last batch finished? File its outputs, advance the cursor.
5. **Check stops** — daily cap hit, cursor exhausted, or too many errors in a row? Exit.
6. **Do the next slice** — pick the next few items; do them inline, or spawn sub-task agents.
7. **Capture learnings** — anything that surprised you, *queue* it for next tick (don't apply it now).
8. **Write state** — cursor, in-flight, count, queued learnings, pause flag. Then the cron fires the next tick.

## The rules that earned their place

Each of these is here because skipping it broke a real loop.

- **Most ticks are no-ops.** A 15-minute cron is a heartbeat, not a workload. The honest tick is usually "still running, exit" or "nothing to do, exit." Never invent work to fill a fire.
- **Queue learnings, apply them next tick.** The gap between noticing something and changing the procedure is your review window: you (or a glance at the reflection log) can veto a bad idea before it's baked in. Same-tick self-editing has no such window and drifts.
- **Bound what the loop may change.** It may edit *its own* `loop.md` and `contract.md`. It may not touch the rest of the workspace, other roles, or the cadence itself (that stays your call). Write the boundary into `loop.md` so a future session can see what it's allowed to do.
- **First tick is light.** If you start the loop inside a busy session, don't immediately spawn a batch on top of all that context. Let the first fire just validate state and exit; the first real batch runs from the next cron, in a clean session.
- **Cap the day, pause on errors.** A hard "N items per day" cap and an "auto-pause after 3 errors in a row" rule bound the cost when something upstream breaks. A degraded tool means stop, not retry 100 times.
- **The reflection log is the audit trail.** Read this morning's reflection before trusting the loop. It's where you see what the procedure changed and, if it drifted somewhere odd, exactly which tick to roll back.

## If it spawns sub-task agents

Two failure modes are worth designing against up front, because both are quiet:

- **Hard checkpoints, not soft bounds.** "Try to stay under ~25 steps" is advisory and gets ignored, agents pull a thread and run out of room before writing anything down. Make it structural: *"by step 10, write what you've confirmed so far; by step 20, write your notes and return."* Now checkpointing is unavoidable.
- **No interim narration.** A sub-task agent that says "Done with that, now starting the next part..." mid-run can read as *finished* and get cut off early. Tell it plainly in the contract: do the work, narrate nothing, return one summary at the end.

## Standing it up

1. Name the cohort and the stop condition. What's being processed, and when is it done (or when does it shift to a lighter "keep it fresh" mode)?
2. Write a starter `loop.md` from the tick above, and a `state.md` with the cursor, caps, and pause flag.
3. If it uses sub-task agents, write `contract.md` with the checkpoints and the no-narration rule.
4. Run it session-bound first (`/loop`). Watch the first handful of ticks and read the reflections before you let it run unattended. If it drifts, pause and adjust, that's cheaper than discovering it a hundred ticks later.

Promoting a loop to run across machines, or coordinating several at once, is a layer on top, not part of the loop. The loop itself is just this: a folder with a procedure, a little state, a daily reflection, and a heartbeat.
