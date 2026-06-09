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
If the role should keep working without you starting each session, run it on a schedule, `/loop`, or cron, that opens a session in its folder. Keep each tick to one bounded output, and let it refine its own approach over time (note what worked in its journal, adjust next run).

That's the whole pattern. A role agent isn't a new kind of thing, it's the folder-with-`.jez` primitive with a persona and a cadence. (When several role agents need to coordinate or run across machines, that's the cloud layer's job, beyond dotjez.)
