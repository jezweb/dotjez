# Skills

Reusable capabilities in the [agentskills.io](https://agentskills.io) standard: each is a folder with a `SKILL.md`, frontmatter (`name` + `description`) followed by the guidance. Agents that support skills (Claude Code and others) discover them by the `description` and load them at the point of need. So the **description is the load-bearing field**: it must say plainly *when* to use the skill.

Why standard skills and not bespoke playbook docs: a skill in this format is discovered automatically and travels to any agent unchanged. A bespoke doc only helps if someone points an agent at it. The convergent format is the feature, not a constraint.

## Using these

These live here as the source. To make an agent actually use them, install them into its skill path (copy or symlink):

- **Claude Code**: into `~/.claude/skills/` (personal, all projects) or a project's `.claude/skills/`.
- **Other agents**: many follow the agentskills.io convention of `~/.agents/skills/`; check your agent's docs.

Verify the current path for your agent before wiring; these move.

Or install the whole set as a **plugin** — the easiest route in Claude Code: `/plugin marketplace add jezweb/dotjez`, then install `dotjez` from the `/plugin` menu (or `/plugin install dotjez`). All the skills become available globally, auto-discovered by description, in every folder you work in. The `SKILL.md` folders stay the portable source; the plugin is just one delivery wrapper, and an agent working in the repo can read them as files regardless.

## Authoring discipline

- **One clear job per skill.** If it does two things, split it.
- **The `description` is the trigger.** Name exactly when to load it, in plain words; that's what the agent matches on.
- **Goals and failure modes, not step-by-step recipes.** A capable model reads intent better than a script, and scripts rot.
- **Prune per model release.** Drop anything current models no longer need. The test for any line: would removing it leave the agent unable to act correctly? If not, cut it.

## What's here

- `plan-and-build/` — how to plan and approach any non-trivial build.
- `write-prompts/` — goal + contract + knowledge, no theatre; worked examples over templates; prompt style and model temperament as levers; right-or-null for derived facts.
- `write-image-prompts/` — the image sibling: concrete specifics over quality adjectives, specify the world not just the subject, presence not absence, reference images anchor style and sets, design for the image's job.
- `verify-current/` — check fast-moving facts (model ids, API shapes, library/framework versions, platform bindings) against the live source, and keep CLIs/SDKs/packages updated, before relying on them.
- `brains-trust/` — convene a panel of other frontier models to review a non-trivial change before commit/deploy; fix cross-validated findings.
- `verify-visually/` — render visual/UI output and actually look at it before calling it done.
- `run-a-role-agent/` — set up an ongoing agent dedicated to a role (webmaster, researcher, bookkeeper).
- `run-a-self-refining-loop/` — grind a backlog over many ticks with a procedure that tunes itself; the safe version.
- `agent-delegation/` — hand a discrete task to a sub-agent well: script-vs-agent (and why scripts compound), spec-to-the-task, protect the main context.
- `orchestrate-agents/` — pick the multi-agent arrangement (single loop, pipeline, routing, parallel, orchestrator-workers, triage funnel), match roles to model temperaments, and the mechanics that keep it safe and cheap. The layer above delegation and role agents.
- `imagine/` — think past the brief and find the bigger product hiding in the request (expansive).
- `challenge/` — stress-test a plan before building: assumptions, unknowns, scope that will change (adversarial).
- `truth-seeking/` — don't invent factual claims; verify and cite, or leave the gap honestly (the factual-content sibling of `verify-current`).
- `stranger-test/` — before shipping docs that agents or newcomers read cold: audit every claim (derived / checkable / judgement), then have a no-context agent actually use the docs and report where it guessed.
- `reason-over-images/` — extracting, measuring, or judging from images: locate-don't-measure, printed values + code arithmetic, witnessed vs advisory channels, interview-to-discover, validate the distribution.
- `reflect/` — an occasional step-back (weekly, at a milestone): for the agent and the human both, what's the shape of the run, what patterns, what to change.

(More essentials welcome, see the authoring discipline above.)

### The planning quartet
`imagine` expands the idea, `challenge` stress-tests it, `plan-and-build` structures the work, and `brains-trust` reviews what got built. Different modes, used in roughly that order; keep them distinct rather than blurring into one "planning" skill.

## What is NOT a skill

- **Workspace-internal playbooks** (onboarding, getting-started) stay in `.jez/playbooks/`: they operate *this* workspace and aren't portable capabilities.
- **Records** (clients, decisions, knowledge, the journal) stay in `.jez/`: they're the knowledge corpus, not skills.
- **Fast-moving reference data** (current model ids, platform facts, version-specific config) doesn't belong baked into a skill at all; a skill that carries it goes stale by next quarter. Skills point at where to *check* (see `verify-current`); the values live at the source.
