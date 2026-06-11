---
name: run-a-role-agent
description: Use when setting up an ongoing agent dedicated to a role rather than a one-off task, a webmaster, researcher, bookkeeper, support triager. Covers shaping the persona and its lane, populating a specialist with real reference (not a generic shell), running it with one bounded output per run, and putting it on a heartbeat. For backlog-grinding work that tunes its own procedure, see run-a-self-refining-loop.
---

# Run a role agent (an ongoing agent for a specific job)

> When the user wants an agent dedicated to a *role*, not a one-off, a webmaster, a researcher, a bookkeeper, a support triager. A role agent is just a folder with a `.jez` whose `about.md` defines the role. You set it up, then run sessions in it: by hand, or on a loop/cron if it should keep going.

## Set it up
1. Make a folder for the role in the workspace (e.g. `webmaster/`) with a `.jez/` inside it.
2. Write its `about.md` as the persona (you're prescribing, not describing):
   - **What it does** and, just as important, **what it does NOT do**, its lane.
   - **Boundaries** — what it must never do without asking (make live changes, send email, spend money).
   - **How it works** — its standard of "done," its voice.
3. Add a role `CLAUDE.md` only once it actually has a convention worth recording, not in anticipation of one. A file full of "to confirm" placeholders is pre-building; leave it until there's a real rule to write. The workspace-level briefs cover the role until then.
4. If the role works from a list of inputs (sites to check, accounts to watch, a queue), keep that list in a file in its `.jez/` that it reads each run, not baked into `about.md`. The inputs change far more often than the persona, so they want their own home, and the role should read the list, never guess it.

## If it's a specialist, populate it, don't just shape it
A designer, writer, quoter, bookkeeper, or developer agent is only as good as the knowledge behind it. The persona is the shell; what makes it actually *good* is the reference it works from, and you usually can't write that from nothing. The failure to avoid: a tidy `about.md`, an empty folder, "set up", a specialist that demos well and fails the first real job, which is worse than none because it looks trustworthy.

- **Ask before you write.** If the job needs things only the user knows (their rates, their house style, their stack, who signs off), ask a few pointed questions first. Don't write a generic persona and call it done, a quoter without the real rate card drafts confident, wrongly-priced quotes.
- **Research, don't invent.** Read the user's own materials as the primary source (past quotes, brand files, the codebase), and verify any domain fact you're unsure of against an authoritative source. A guessed fact baked into a specialist's reference gets repeated to every client, invisibly.
- **Give it reference files, and at least one worked example.** Put the substance in its `.jez/` as files it reads each run: the rate card, the style guide, the stack conventions, whatever the work runs on. And for anything where quality is about voice, format, or taste (a writer, a quoter, a designer), one real piece of the user's own good work teaches it far more than any description you'd write, ask for a job they're happy with and make it the quality bar.

The test of a specialist: *could it do one real job well today?* If there's a persona but no rates, no example, no house style, the answer is no, it only looks set up.

## Run it
- **One bounded output per run.** Depth over breadth: one thing done properly beats five skimmed. This is the single most important habit for an agent that runs often.
- **Journal each run** (`<role>/.jez/journal/`) so the next run picks up cleanly.
- **Surface, don't sprawl.** A role agent stays in its lane and flags things for you rather than wandering into work that isn't its job.
- **Decide where a flag surfaces.** The journal is its durable record, but a watcher whose alerts only sit in a journal you'd have to go open is half-useless. Settle up front: when a run turns up something that needs you, where does it go so you'll actually see it, and may it message you (and how)? Reaching anyone *outside* (clients, third parties) stays off-limits unless you've explicitly said otherwise.
- **Know when to stop.** Define what "nothing to do this run" looks like, so a loop can idle instead of inventing work.

## Make it ongoing
If the role should keep working without you starting each session, put it on a heartbeat that opens a session in its folder. Two routes, in order:

- **Start with a session-bound loop** — in Claude Code that's `/loop`, which reruns a prompt on an interval while a session is open (use your harness's equivalent). Begin here: it's the cheapest way to watch the first few ticks behave before you trust it.
- **Then a real schedule** — one that fires even when you're not at the machine. *How* that works depends on the user's setup (their OS scheduler, their agent harness), so ask what they've got rather than assuming a command. A schedule that survives a closed laptop, or runs the same role across machines, is the cloud layer beyond plain dotjez.

Pick a generous interval. A heartbeat is not a workload, most fires should be "nothing to do, exit," so checking every 30–60 minutes is usually plenty, not every minute. A few hard-won rules for loops:

- **Most fires are no-ops.** The schedule is a heartbeat, not a workload, a tick should usually be "nothing to do, exit" or "still working, exit." Don't invent work to fill it.
- **One bounded output per fire**, with a clear stop condition so it can idle instead of sprawling.
- **Let it refine its own approach** (note what worked in its journal, adjust next run), but *only* its own, a loop shouldn't rewrite anything outside its job.
- **Session-first, cloud-later.** Run it session-bound first and watch a few ticks behave before you promote it to always-on.

That's the whole pattern. A role agent isn't a new kind of thing, it's the folder-with-`.jez` primitive with a persona and a cadence, running on plain Claude Code: the heartbeat schedules it, sub-task agents do any heavy batches. Coordinating many such agents at once is the bit beyond dotjez, not the role itself.

When the work is bigger than one session can finish and the loop should *tune its own procedure* as it goes (a backlog to grind through, patterns worth capturing), that's its own skill: see [[run-a-self-refining-loop]] for the tick shape, the files it keeps, and the handful of rules that keep a self-modifying loop safe.
