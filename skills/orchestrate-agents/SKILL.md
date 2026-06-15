---
name: orchestrate-agents
description: "Use when deciding how to arrange agents for a piece of work: one agent or several, which pattern (single loop, pipeline, routing, parallel, orchestrator-workers, evaluator loop, triage funnel), how to match roles to model temperaments, how to bound a model-driven control loop so it's safe to trust instead of hand-coding a deterministic spine, and the mechanics that keep multi-agent work safe and cheap. The layer above agent-delegation (one-off hand-offs) and run-a-role-agent (one ongoing role)."
---

# Orchestrate agents: pick the arrangement, then the models

Multi-agent is a cost you pay, not a virtue you collect. The default is **one capable agent in a tool loop**; every additional agent adds coordination, latency, and new failure modes. Escalate to an arrangement only when at least one of these is true:

- the task has **independent subtasks** that can genuinely run in parallel
- **tool noise** is polluting the main agent's judgment (long tool transcripts degrade decisions; a worker can absorb them and return a conclusion)
- **cost per iteration** is high and most of the work doesn't need the big model
- the work needs **persistent memory** in one place while the doing stays stateless

## The arrangements

The first five follow Anthropic's taxonomy (their "Building Effective Agents" is the canonical read); the sixth keeps earning its place in fleet work:

| Pattern | One line | Reach for it when | Skip it when |
|---|---|---|---|
| **Single loop** | One model, tools, it decides when to stop | Most tasks; steps can't be pre-decomposed | The task is fixed-shape (write a script) |
| **Pipeline** | A → B → C with checkpoints | Clean sequential stages (draft → translate → format) | Stages need to talk backwards |
| **Routing** | A classifier sends input to one of N handlers | Heterogeneous inputs needing structurally different handling | Categories aren't crisp; misrouting is silent |
| **Parallel** | Independent calls at once; aggregate or vote | Speed (independent sections) or confidence (multiple perspectives on an uncertain answer) | Hidden dependencies between the calls |
| **Orchestrator-workers** | One agent decomposes and dispatches focused workers, then synthesises | Subtasks aren't known until inspection; tool noise needs absorbing | Small tasks (ceremony exceeds work) |
| **Triage funnel** | Cheap sweep detects, escalates only flags to a judgment model | High-volume recurring work where most items are routine | Every item genuinely needs judgment |

The funnel deserves emphasis because it answers the cost question most fleets get wrong: don't run the smart model over everything daily — run a cheap compliant model that detects *change*, and spend judgment only on what it flags. Typically 5-10× cheaper AND better, because the strong model sees only interesting input.

## Roles match temperaments

Models differ on two axes that matter more than size for agentic work (see `write-prompts`): judgment (questions its inputs) vs compliance (does exactly as told). Every temperament has a home:

| Role | Temperament | Prompt style | Tools |
|---|---|---|---|
| **Orchestrator** | Judgment | Goal-oriented; identity primes effort ("you are the X orchestrator" reads differently from "process this record") | Plan, dispatch, synthesise, write results — not the raw data tools |
| **Worker / investigator** | Cheap and diligent | Directive, tight scope, explicit output envelope | The actual MCP/data tools; read-only on shared state |
| **Verifier** | Compliant — here compliance is the *virtue* | Directive checklist against the worker's output | Read-only on what the worker did |

Anything where the input might be wrong wants a judgment model — a compliant one executes a wrong instruction perfectly and corrupts your records without a sound. Price is not a proxy for temperament: cheap models can be diligent, premium ones obedient. Bake off on *your* task with a deliberate flaw planted in the input to see who notices, and re-run when the model landscape shifts.

## Running the control loop as an agent — bound it, don't avoid it

The strongest form of "reach for the agent first" (`plan-and-build`) is letting the *loop itself* decide what to read, when to fan out, and what to write — instead of a hand-coded spine that polls, packs context, and pre-scripts the map-reduce. The objection is real: an unbounded loop wanders and burns tokens. But the answer is a fenced loop, not a deterministic spine — you keep the agent's judgment about *which* inputs matter and *when* to stop, which a fixed pipeline can't give you.

- **Fence the failure you observe, don't pre-fence the loop.** It's tempting to make a loop "safe" by bolting the whole kit on up front — a step cap, a no-progress budget, per-turn tool scoping, approval gates, a finish tool, a tool whitelist. Resist it: build minimal-first here too (`write-prompts`). Start from the bare pattern and add a fence only when inspection shows the specific failure it cures — it wandered → step cap; it wrote to scratch space → scope that tool; it never stopped → no-progress budget; it can act destructively or outward → approval gate. Much of that control machinery turns out to compensate for a *cluttered tool surface*, not a model weakness; strip the surface first, and a capable model on a clean one often needs almost none of it. The fences that do earn their place bound the loop's freedom without pre-deciding it. (A managed harness — Claude Code as a library, the Agents SDK Think class — provides these as primitives when you need them; reach for it before hand-rolling durability, polling, and context-packing.)
- **Migrate the spine, keep the brain.** Moving from hand-coded control to a loop (or a harness that provides one) changes only the *execution plumbing*: the detached-run polling, the context-packing, the rigid pipeline. Everything that carried judgment ports over unchanged — the prompts, the doctrine, the write conventions, the role identities. If the migration tempts you to rewrite the prompts too, you've mistaken the spine for the brain. Rebuild the spine; port the brain.

## Mechanics that earned their place

- **Parallel dispatch is free wall-clock.** An orchestrator that emits three dispatches in one turn waits only for the slowest. The most underused lever in the pattern; strong orchestrators parallelise on their own, weaker ones need telling.
- **Iteration caps are safety rails, not behaviour tuning.** Tight caps (8, 15) cut workers off mid-investigation and return "unknown" before convergence. Set them generous (50+); the model's own decision to stop is the natural exit.
- **Let the orchestrator self-serve cheap reads, dispatch the bulk.** Reading known state itself is fine; anything that pulls volumes of live external data into its context re-imports the tool-noise problem workers exist to solve.
- **Worker contracts: one bounded output, no interim narration, hard checkpoints.** The loop-safety rules in `run-a-self-refining-loop` apply to every dispatched worker.
- **Two prompts that are each fine can fail at the interface.** One real fleet had an orchestrator gating confidence per-field while its investigator reported it per-envelope — each prompt correct alone, and a seven-fact answer got one rating. Audit the contract *between* agents (names, units, granularity), not just each prompt; granularity mismatches degrade both sides silently.
- **The first write to shared state is the boundary; cross it in shadow mode.** Everything before an agent's first write to live shared state is reversible; after it, propagated. Run it writing to a quarantine path first (same work, parked output), read that output at volume, then graduate writes from low-stakes records upward — and hold outputs that trigger *other* agents (briefs, messages) behind a gate until their acceptance rate earns release.
- **Verify by reading outputs, not aggregates.** A run that confidently did the wrong thing produces the same green stats as one that did the right thing; the difference only shows when you (or a verifier) read what it actually wrote. And when an agent "isn't doing X", check it isn't doing X a *different way* before you "fix" it — your instrument often measures the tool you expected it to use, not the raw one it actually used.
- **Agents outside your harness don't inherit your briefs.** A Claude Code session auto-loads the workspace CLAUDE.md cascade; an API-called or Worker-hosted agent gets nothing unless you assemble those briefs into its system prompt per task. Without that, it hallucinates your conventions. The brief assembly *is* the onboarding.
- **When an agent writes into a file a human also owns, give it one block, not the whole file.** A naive append duplicates sections; a naive overwrite destroys the human's work; asking the model to regenerate the merged file is slow and drifts (a full rewrite of a large record times out and silently truncates). Instead the agent maintains a single delimited block it owns (`<!-- agent:mined start … end -->`) and rewrites *only* that block each run, appending it once if absent. Every other byte is preserved deterministically, at any file size — the human owns the file, the agent owns its block. The file-level form of "code owns structure, the model owns judgment" (`write-prompts`): never have a model reproduce a large artifact it could instead edit in place.
- **Compute identity in code; model "same-as" as an edge, not a merge.** Ask a model to mint a record id and three models give three ids for the same input — identity must be derived deterministically (a slug from the domain, a hash of source-id + timestamp) so a re-run upserts instead of duplicating. When two records turn out to be the same entity, link them with an explicit alias / same-as edge rather than silently merging: the merge is lossy and unreviewable, the edge is neither. Another instance of code owning structure while the model owns the judgment of *whether* they're the same.
- **An agent free to file needs a basis for restraint.** Agents file reflexively, and reflexive filing is how a knowledge corpus drowns — the same completion pressure that makes a model fill an empty slot (`write-prompts`) makes it keep every scrap it extracts. The discriminator isn't "is this true or useful" but "does *this* owner or purpose need it to operate?", judged against an owner/task profile the agent reads on wake; noise stays in an inbox rather than getting filed. And don't crystallise a recurring observation into durable knowledge until it has actually recurred (≈3×) — graduate on repetition, not on first sighting.

Pair with `agent-delegation` (should this be an agent at all, or a script?), `run-a-role-agent` (one ongoing role), `run-a-self-refining-loop` (the loop mechanics), and `write-prompts` (prompt style × temperament). The failure this prevents: a fleet of agents that costs ten times what the work needs, an orchestrator drowning in tool output, a compliant model silently corrupting records that a $0.05 diligent one would have flagged — or multi-agent ceremony wrapped around a task one good agent would have just done.
