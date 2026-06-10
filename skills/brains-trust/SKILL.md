---
name: brains-trust
description: Use after any non-trivial build, before commit or deploy. Convene two or more frontier models from different families and providers to review the change for Critical/High/Medium/Low findings; fix cross-validated Criticals before commit and Highs before deploy. Also when the same bug won't fix on the first attempt, or for a whole-codebase pass before a release.
---

# Brains-trust: a panel of other models before you commit

Your own review pass, and the model that wrote the code, share blind spots. A panel of two or more frontier models from *different families and providers* catches what a single pass confidently waves through: authz holes, race conditions, platform gotchas. The signal to trust is when reviewers independently flag the *same* thing. (Even a brand-new flagship benefits, no model escapes its own blind spots.)

**Convene the panel.** Pick a current frontier model from each major family and run them via different providers, so they're genuinely independent eyes and not the same model twice: for example Anthropic Opus, OpenAI GPT-5.x, Google Gemini 3.x, and strong open models (DeepSeek, Qwen) via OpenRouter, Cloudflare Workers AI, or NVIDIA NIM. Verify the current model ids first (see `verify-current`).

**Brief them.** Bundle the changed source plus the goal plus the proof-of-done (or the audit doc) into one prompt. Ask each for findings ranked Critical / High / Medium / Low, each with file-and-line evidence.

**Decide by cross-validation, not vote count.**
- A finding two or more reviewers independently raise is real. Fix cross-validated Criticals before commit, cross-validated Highs before deploy.
- A finding only one reviewer raises is a maybe; weigh it on its evidence.
- A claim with no supporting evidence is not a finding. Reject it. Panels produce noise; filtering it is part of the job.

**Their findings are input to your judgement, not a to-do list.** The panel sees the diff, not the why, your constraints, the project's context, what's actually happening. So even a cross-validated finding gets checked before you act on it: verify the advice against the current docs (`verify-current`) and judge whether it's right for *this* project, not just correct in the abstract. A confident, agreed-upon suggestion can still be wrong for you. You own the call; the panel only informs it.

**The one trap: reviewers can't see the live world.** A "this version/API/model doesn't exist" or "that's deprecated" finding is usually a training-cutoff artifact, and two reviewers agreeing on a stale fact is not evidence, they share the same cutoff. Version and existence claims are verify-live-only: route them to `verify-current`, never let the panel decide them.

**Save the panel.** Write the findings, what you fixed, and what you rejected (with reasons) to `<project>/.jez/audits/<date>-brains-trust-<topic>.md`, so the rationale survives the session.

**When to run it:** after any non-trivial build before commit; a whole-codebase pass before a release; a targeted pass any time the same bug won't fix on the first attempt.

The failure this prevents: shipping the authz hole, the race, or the platform gotcha that a single reviewer (you, or the model that wrote it) confidently missed. The panel's independent eyes are the cheapest place to catch it.
