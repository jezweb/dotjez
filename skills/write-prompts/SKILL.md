---
name: write-prompts
description: Use when writing or revising any prompt, a system prompt, an agent brief, an extraction or classification prompt, a sub-agent contract, or when a prompt-driven feature underperforms. Covers the three parts a prompt needs (goal, contract, knowledge), worked examples over templates, the directive vs goal-oriented style lever, matching model temperament to the task, right-or-null for derived facts, and pruning the bloat ratchet.
---

# Write prompts: brief a competent specialist, don't costume an actor

A prompt needs three things. Everything else changes the vibe, not the output.

- **Goal** — what you're making and what "good" looks like, in plain language, a few sentences.
- **Contract** — the exact output the code depends on: the JSON shape, the field names and types, the format. Precise and non-negotiable.
- **Knowledge** — what the model can't infer: the catalogue, the real facts, the vocabulary, the genuine gotchas. Terse, and sourced (see `truth-seeking`); a guessed fact baked into a prompt gets repeated to everyone.

**Cut the theatre.** Persona costumes ("you are a world-class..."), threat emphasis (CRITICAL, ALL-CAPS, "instant fail"), anti-pattern lists that just invert guidance already given, the same rule restated in three registers, step-by-step coaching on how to think. Test every line: *does removing this change the output, or just the vibe?* Vibe-only means cut. The tell you've drifted into theatre: the prompt is reassuring *you* it's rigorous instead of telling the *model* something it didn't know. (A wall of constraints also makes reasoning models deliberate longer, for nothing.)

**One worked example beats a rigid template.** For natural-language output (an email, a report, a summary), one real, good example teaches tone, depth, and structure better than any placeholder template, and a template quietly becomes a ceiling: the model fills the form instead of exceeding the bar. Give the quality bar plus one worked example and let the structure flex. The exception is strict machine-read output (tool inputs, API payloads): there, exact format spec is correct.

**Prompt style is a lever; pick it deliberately.** The same model behaves differently under a numbered checklist than under "figure out what's needed here":

| Task character | Style | Why |
|---|---|---|
| Judgment, investigation, input might be wrong | Goal-oriented | Gives a diligent model room to dig; a checklist caps it |
| Structured, follow-the-recipe, predictable | Directive (numbered steps) | Imposes an effort floor; lazy models can't satisfice their way out |
| Unsure of the task's shape | Goal-oriented, on a judgment-strong model | The most defensive combination |

**Match the model's temperament, not just its size.** Two dimensions matter more than raw capability for agentic work: does the model *question its inputs* (judgment) or *do exactly as told* (compliance)? Both are virtues for different jobs. Compliance is right when the instructions are trusted and the output must be predictable (helpdesk replies, form-fill, extraction). Judgment is right whenever the input might be wrong, because a compliant model executes a wrong instruction perfectly and corrupts your records without a sound. Price is not a proxy for either: cheap models can show strong judgment and premium ones can be blindly obedient. Bake off candidate models on *your actual task*, ideally with a deliberate flaw planted in the input to see who notices, and re-run when the model landscape shifts (model names and rankings rot; see `verify-current`).

**Derived facts: right or null, never confidently wrong.** When the model computes, measures, or infers a value rather than copying it from the source, design for abstention: emit the value only when the source explicitly supports it, otherwise leave it null for a human. A null is recoverable; a confident wrong value gets acted on. Have the model return the parts it can read and let *code* do the arithmetic. Don't trust self-reported confidence, and don't trust one happy-path sample: test across the real distribution and measure the confidently-wrong rate, because that's the number that matters.

**Give thinking room, or turn it off.** Reasoning models spend their output budget on thinking first; a tight token cap returns empty or truncated content with no error. For structured tasks, either disable thinking or budget generous headroom. Reserve extended reasoning for genuinely open problems; fast non-reasoning models usually win on structured output.

**Prune the ratchet.** Prompts bloat one bug-fix rule at a time and nothing ever removes one, so they drift into fifty-rule recipes that cap quality and confuse capable models. Re-test on every model upgrade: scaffolding written for last year's model is often dead weight now, sometimes actively harmful. Apply the per-line test on every revision, and leave the prompt shorter than you found it where possible.

The failure this prevents: a prompt that grows ever longer while the output gets worse, a confident wrong value acted on, a compliant model faithfully executing a wrong instruction, or a quality ceiling you installed yourself with a template. Pair with `plan-and-build` (goals over recipes is the same rule at build scale) and `truth-seeking` (for the facts that go in the knowledge block).
