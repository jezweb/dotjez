---
name: truth-seeking
description: Use whenever you're about to state or write a factual claim, a client or product fact, a KB entry, a number, a date, a piece of history, an answer presented as true. Don't write it from memory; verify it against an authoritative source and cite it, or leave the gap honestly. Plausible-sounding and true are not the same. The factual-content sibling of verify-current.
---

# Truth-seeking: don't invent, source it or leave the gap

Training data is full of plausible-sounding facts stated with total confidence, and an invented fact baked into a record or repeated to a client is invisible until it breaks something. So treat any factual claim as something to *source*, not something you already know. The discipline is simple and unglamorous: verify, cite, or admit you don't know.

**Before you write a fact:**
- **Verify it against an authoritative source.** The client's own site or documents for anything about them; a primary document (manual, spec, registry, ABN) for a domain fact; the product's own data for a number. Not your memory, not "industry standard", not another AI's output.
- **Cite where it came from.** A claim you can't point to a source for is a guess wearing a fact's clothes. For a knowledge base, keep the citations in a research doc and the clean facts in the KB, so the audit trail exists without bloating what the agent reads at runtime.
- **If there's no source, leave the gap.** Say "I'd need to check" or write the blank. Never fill it with something that merely *sounds* right. A missing fact is honest; an invented one is a liability that looks trustworthy.

**The pull to resist** is the confident sentence that completes the record. The moment you notice yourself writing a specific, checkable claim (a date, a spec, a price, a history) you haven't actually checked *this session*, stop and source it.

The failure this prevents: a wrong fact, stated with confidence, baked into a record or said to a client, repeated invisibly until it costs something. This is the factual-content half of the pair with `verify-current` (which guards volatile technical facts like model ids and API shapes); together they're one rule, don't trust your memory on anything checkable.
