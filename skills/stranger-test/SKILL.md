---
name: stranger-test
description: "Use before shipping anything agents or newcomers will read cold: a README, a CLAUDE.md or workspace brief, a skill, a playbook, a template repo, onboarding docs, a production prompt or sub-agent contract. Two moves: audit every claim (derived / checkable / judgement), then run a clean-context dress rehearsal where a no-context agent actually uses the docs and reports where it guessed. Catches insider references, drifted counts, broken pointers, and stale facts the author's context papers over."
---

# Stranger-test: audit the claims, then rehearse a stranger

Docs written from inside a project inherit the author's context invisibly. The author's head fills every gap, so the doc reads fine to them and fails the first reader who arrives without it. Two moves close the gap.

**First, audit the claims.** Every sentence is one of three kinds, and each kind has its own fix:

- **Derived** — restates something a source already holds: a count ("ten skills"), a name-list, an index, a value duplicated from elsewhere. Delete it or replace it with a category or pointer. A derived claim is a promise to update two places forever, and it *will* drift; describe the shape, let the source stay the truth.
- **Checkable** — a claim about the live world: a URL, a version, a path, a file that "ships with" something, a tool's behaviour. Check it now, against the live thing — including your memory of your own repos, which is exactly as unreliable as anyone else's.
- **Judgement** — intent, taste, a decision, a convention. Keep it and sharpen it; this is the part only the author can write, and it's what the doc is *for*.

**Then run the dress rehearsal.** Spawn a fresh agent with no context beyond the docs themselves, playing the doc's real audience ("you just cloned this and your user said: set it up"). Don't ask *"is this clear?"* — it will say yes. Make it **use** the docs: follow the setup, do the first task, then report concrete defects, each with file and quote:

- references it couldn't resolve from inside the docs (names, tools, paths that mean nothing to an outsider)
- contradictions between files, and counts or lists that don't match reality
- broken internal pointers
- places where following the instructions literally forced a guess
- external claims that turned out false when probed live

The rehearsal finds what the audit predicts, at scale, because the stranger doesn't carry the context that papers over the gaps. Fix what it finds; rehearse again if the fixes were structural.

A production prompt gets the same treatment, because a model reads it colder than any newcomer: have a *different* model adversarially cold-read it ("what would you guess at? what's stated nowhere?") before shipping. Real fleets caught correctness bugs this way — an unstated confidence gate, a field name that silently dropped data — that the author's read could never see.

The failure this prevents: a template, brief, or onboarding doc that works perfectly for its author and silently fails every real reader — each one quietly guessing, none of them telling you. Pairs with `truth-seeking` (the checkable bucket is its territory) and the keep-docs-current habit (the audit is what Tidy looks like at sentence level).
