---
name: plan-and-build
description: How to plan and approach a non-trivial build or feature with an agent, before writing phases or code. Covers the Phase-0-refactor catch, thinking in contracts, writing the proof of done first, verifying by inspection, splitting plan from spec, and trusting skills over elaborate code. Load when starting, scoping, or planning any substantial piece of work.
---

# Planning and building with an agent

A few habits that decide whether a build goes well, learned the expensive way. They apply to any stack. Read them before you start something non-trivial, not after it's gone sideways.

**Phase 0: a multi-phase plan is usually a refactor in disguise.** When you catch yourself writing "phase 1, phase 2, phase 3", stop and ask what single shared thing would make phases 2 through N trivially easier: a common contract, one unified shape, a piece of plumbing done once. Build that first. The tells: every phase touches the same files, or repeats the same boilerplate, or phase B exists only so phase C can use what it made. That repeated thing is the real work; the phases are it, deferred and duplicated. Surfacing the Phase 0 refactor before you start saves you from codifying the drift into N separate sessions.

**Think in contracts, not code.** Every "I have to remember to also edit X", every type written on both sides of a boundary, every "don't forget to update Y" is a missing contract: an interface that's implicit when it should be explicit. The fix is almost never "try harder to remember". It's making the contract one shape, in one place, enforced by the type system or the structure. When a request sounds like "adding X is annoying" or "I keep forgetting Y", find the contract that's wrong and fix that, not the symptom.

**Write the proof of done before you write the code.** Name the literal yes/no test that proves each slice actually ships: real services, real data, end to end. Not "the tests pass", not "no errors", the actual thing someone cares about, happening reliably. Writing it down first sharpens the scope and surfaces hidden assumptions, and it catches the classic failure where everything compiles green but the loop never closes.

**Verify by inspection, not by summary.** A green check, a passing test, a tool's "success" is where verification starts, not where it ends. Before you call something done, look at the actual output: open the file, read a few of the changed rows, view what the user will see, fetch the URL. "X of Y passed" hides the failures, so examine them one by one. If you'd be embarrassed when asked about a specific item you never looked at, look at it now.

**For substantial work, split the plan from the spec.** Keep a short plan (the why and the shape, decisions surfaced, scannable in five minutes, the thing you argue about) separate from a longer build-spec (the how: file paths, schemas, signatures, verification gates, the thing you build from). Split them whenever someone, maybe future-you, will rebuild context cold. One mega-doc always rots into too-abstract-to-build-from and too-detailed-to-review at the same time.

**Trust skills and tools over elaborate code.** Before you build a config DSL, a rules engine, a schema with twelve optional fields, or a "smart" routing layer, ask whether it could be a markdown instruction the agent reads plus a tool it calls. It almost always can, and that version is the one you'll still understand in three weeks. Reserve the elaborate, deterministic machinery for the places that genuinely need it: auth, money movement, schema migrations, the scheduling primitive underneath.

**When you write for the next agent, give goals, not recipes.** This applies to rules, prompts, agent briefs, and skills like this one. Describe what good looks like and the failure mode to watch for, then trust the model to get there. A capable model reads intent better than it follows a step-by-step script, and prescriptive scripts rot: they get obeyed long after the conditions that justified them changed. Write less, name what could go wrong, leave the how to the reader. The test for every line you add: would removing it leave the agent unable to act correctly? If not, cut it.

---

The shape of a good build, in order: plan the shape, name the proof gates, find the Phase 0 contract, build, verify by inspection, commit at each waypoint. Each pass should leave the next one better informed than the last.
