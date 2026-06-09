# Run a role agent (an ongoing agent for a specific job)

> When the user wants an agent dedicated to a *role*, not a one-off, a webmaster, a researcher, a bookkeeper, a support triager. A role agent is just a folder with a `.jez` whose `about.md` defines the role. You set it up, then run sessions in it: by hand, or on a loop/cron if it should keep going.

## Set it up
1. Make a folder for the role in the workspace (e.g. `webmaster/`) with a `.jez/` inside it.
2. Write its `about.md` as the persona (you're prescribing, not describing):
   - **What it does** and, just as important, **what it does NOT do**, its lane.
   - **Boundaries** — what it must never do without asking (make live changes, send email, spend money).
   - **How it works** — its standard of "done," its voice.
3. Add a role `CLAUDE.md` only if it needs conventions beyond the workspace brief.

## Run it
- **One bounded output per run.** Depth over breadth: one thing done properly beats five skimmed. This is the single most important habit for an agent that runs often.
- **Journal each run** (`<role>/.jez/journal/`) so the next run picks up cleanly.
- **Surface, don't sprawl.** A role agent stays in its lane and flags things for you rather than wandering into work that isn't its job.
- **Know when to stop.** Define what "nothing to do this run" looks like, so a loop can idle instead of inventing work.

## Make it ongoing
If the role should keep working without you starting each session, run it on a schedule (`/loop` or cron) that opens a session in its folder. A few hard-won rules for loops:

- **Most fires are no-ops.** The schedule is a heartbeat, not a workload, a tick should usually be "nothing to do, exit" or "still working, exit." Don't invent work to fill it.
- **One bounded output per fire**, with a clear stop condition so it can idle instead of sprawling.
- **Let it refine its own approach** (note what worked in its journal, adjust next run), but *only* its own, a loop shouldn't rewrite anything outside its job.
- **Session-first, cloud-later.** Run it session-bound first and watch a few ticks behave before you promote it to always-on.

That's the whole pattern. A role agent isn't a new kind of thing, it's the folder-with-`.jez` primitive with a persona and a cadence. The loop itself runs on plain Claude Code: `/loop` (or cron) is the heartbeat, sub-task agents do the batches, so even a *self-refining* loop, one that processes a slice each tick and tunes its own procedure (keep its proc / state / a daily reflections log as markdown in its folder) works on one machine. What a cloud layer adds is making those loops **persist and run across machines** (so the cron survives a sleeping laptop and the same loop runs everywhere) and coordinating many agents at once, that's the bit beyond dotjez, not the loop itself.
