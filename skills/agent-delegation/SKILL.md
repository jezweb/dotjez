---
name: agent-delegation
description: Use when about to delegate a discrete task to a sub-agent, deciding whether to spawn one at all, how much to specify it, and how to keep its work from bloating the main thread. The one-off-task layer below run-a-role-agent. Triggers, "delegate this", "spawn a sub-agent", "should this be a sub-agent or a script", "fan this out".
---

# Agent-delegation: hand off a task well

Before you spawn a sub-agent, a couple of decisions decide whether the hand-off helps or just adds cost and flakiness.

**First: should this be an agent at all, or a script?** If the work can be described as code, write the code. Agents are for *judgment*; scripts are for *precision*. Copying files, transforming a format, a deterministic sweep, those want a script, not a non-deterministic agent doing them by hand. A useful tell: three or more bash commands for one logical operation is a script waiting to be written. And the payoff compounds: the script lands in `scripts/` and the next time the job comes up it's already solved. That's often *why* a good scripts folder accumulates. An agent run leaves nothing reusable behind; a script does.

**Spec to the task type.** Mechanical, repeatable work wants tight, rigid steps. Judgment work wants the goal and a few guidelines, not a script it'll follow off a cliff. Creative work wants almost nothing but the goal. Over-specify a judgment task and the agent fills your template with "N/A"; under-specify a mechanical one and the output varies wildly run to run.

**Protect the main context.** Beyond parallelism, the reason to delegate is to keep heavy reads and big tool outputs *out* of the main thread, the sub-agent absorbs the bulk and hands back a conclusion, not the raw material. Have it log progress to a file as it goes, so a crash or restart doesn't lose the work.

**Fit the model where your harness lets you.** Cheap model for the grunt extraction, the strong one for the judgment call. This is harness-dependent, some setups (including Claude Code right now) don't reliably route a sub-agent to a different model, so check before you rely on it (see `verify-current`).

The failure this prevents: spawning an agent for something a script should own (non-determinism where you needed precision, and nothing reusable left behind), mis-specifying it for its task type, or drowning the main thread in a sub-task's output.
