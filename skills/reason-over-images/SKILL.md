---
name: reason-over-images
description: "Use when asking a model to read, extract from, measure, count, or make judgements about images: technical drawings and plans, photos, scans, documents, screenshots. Covers what vision models do reliably (locate, read, judge) vs unreliably (measure, count precisely), reading printed values with code doing the arithmetic, the two-channel pattern (witnessed extraction vs advisory read), interview-to-discover then schema-to-ship, finding a ruler in the image, and validating across the whole distribution."
---

# Reason over images: trust what's printed, suspect what's inferred

Vision models read, locate, and judge well; they measure and count badly while sounding equally confident either way. Every pattern here exists to keep that asymmetry from reaching production.

**Locate, don't measure.** Bounding boxes and coordinates are approximate, and worse on dense technical content. One target per ask: a single requested box at full resolution comes back tight; ask for many zones at once and they come back loose and clustered. Boxes are for *finding* things and getting an envelope — never treat them as measurement.

**Read printed values; let code do the arithmetic.** Have the model return the parts it can literally read off the image (the dimensions, the callouts, the line items, what to multiply) and compute the sums in code — models are unreliable at arithmetic and worse at geometry. And only *explicitly printed* parts: a model decomposing a complex shape will grab one overall dimension pair, stop early, and confidently report half the true value. Under-decomposition is the signature failure, and it arrives marked "high confidence".

**Guard derived numbers externally; self-reported confidence lies.** Guards that actually work: a **completeness check** (do the parts reconcile against a printed total? does the boundary close?), **cross-model agreement** (two or three models independently deriving the same decomposition is a cheap, strong check; disagreement = flag low), or restricting the output to printed values only. When no guard passes, abstain: a null is recoverable, a confident wrong number gets quoted, billed, or built.

**Two channels, never mixed.** Split the output into a **witnessed channel** (only values quoted verbatim from the source — safe for automation to consume) and an **advisory channel** (estimates, judgment calls, "confirm with the client" flags — confidence-tagged, rendered as a human checklist, never feeding the automated calculation). The advisory channel is where the model's real expertise lives: the things a senior practitioner would notice that no schema field asks for. Keep the channels visually distinct so nobody mistakes an estimate for a fact.

**Interview to discover, schema to ship.** A conversational read ("what do you see? how confident? what would you flag?") surfaces far more than a rigid schema, which flattens judgment into enum fields — the model often *knows* things the schema gives it no way to say. Prototype with interviews to learn what the model can actually see; productionise with the schema once you know what to ask for.

**Find the ruler in the image.** A repeating structure (a grid, tiles, brick courses, parking bays) anchored to ONE printed dimension pins the scale of everything else — counting cells beats estimating pixels, and several independent models will count the same structure the same way. When nothing is printed and there's no ruler, that's an abstain, not a guess.

**A detailed field schema beats "describe this image."** Ask explicitly for the fields you want — visible text, colours, counts, materials, condition, use-case tags — and the model fills what it sees and omits what it can't. A terse "describe it" returns prose that's hard to consume and skips exactly the details you needed.

**Validate across the distribution, then look at the images yourself.** One good sample is survivorship bias: a measurer that nails the simple case can confidently halve the complex one and safely abstain on the rest, and only the full range reveals the split. Score every change as right / confidently-wrong / abstained across the real variety of inputs — the confidently-wrong rate decides shippability, not the best case. And before repeating "the AI made the right call" about any specific image, open that image and look (the visual arm of verify-by-inspection).

The failure this prevents: a quote, invoice, or build decision made off a confidently wrong number that a human would have caught in one glance; an extractor that demos perfectly and silently corrupts a quarter of real inputs; and the quieter loss — judgment the model offered freely in conversation that the schema never let it say. Pairs with `write-prompts` (right-or-null is the same rule for text) and `verify-visually` (that one checks *your* output; this one governs the model reading *theirs*).
