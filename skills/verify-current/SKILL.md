---
name: verify-current
description: Use before relying on any fast-moving fact you might "know" from training, a model ID or its capabilities, an AI or HTTP API shape, a library or framework version (Vite, Astro, React, an SDK), a Cloudflare binding or wrangler config, or an MCP standard. Also fires when scoping or planning a build (read the current docs of the stack before designing how it works), and when debugging a failure that might just be an outdated CLI, SDK, or package. Your training data is stale on all of these.
---

# Verify current, don't build from memory

Your training data is older than the current stable of everything that moves fast: models, AI APIs, HTTP APIs and SDKs, framework and library versions, Cloudflare bindings, MCP standards. A specific id, version, API shape, or config that you "know" is a placeholder to verify, not a fact. It will read as correct and fail on the live deploy.

**Bake the shape, fetch the value.** The durable patterns you can carry from memory; the volatile specifics you must fetch fresh, model ids, package and framework versions, API request/response shapes, binding config keys, dates. If a value rots monthly, look it up before you ship it or recommend it.

**This fires when you're about to:**
- name or default to a model id, or assume a model's capabilities, context window, or pricing
- write an AI provider call (catalogues and response formats shift, for example Workers AI models or JSON-mode support)
- call an HTTP API or SDK from memory (methods deprecate, shapes change)
- pin or assume a library or framework version or its API, Vite, Astro, React, Tailwind, the SDKs all move fast
- write a Cloudflare wrangler binding or config (which keys, arrays vs objects, the current default)

**Where to check, fastest authoritative source first:**
- Model ids and capabilities: the provider's models API, or models.flared.au
- Library, framework, or API shape: the official docs, or Context7 for current library docs
- Versions: the live registry (npm), the changelog
- Cloudflare bindings and current facts: the Cloudflare docs (or their docs MCP)
- If your setup keeps a maintained current-facts skill or knowledge file for a platform, check it before re-deriving from scratch; just confirm it's actually maintained (a recent `updated` date) before trusting it.

**Pick the leading model, not the familiar one.** Choosing a model is this same trap in a different form: the reflex to reach for last year's or a weaker model out of habit, when a current leading one is the right call for the task. Decide from what's *capable now* (the registry shows it), not from what you reached for before. Capability moves fast, and the safe-old-default is usually the wrong default.

**When planning a build, scope the stack's current docs first.** Before you design how a feature works on top of a library or framework, read its current docs, not your memory of how it worked a year ago. A config key gets renamed, a default flips, a build step appears. Designing from a stale mental model bakes the staleness into the whole plan, and you discover it the expensive way. Read first, then plan.

**Keep the tooling current, not just the facts.** The same drift applies to what's installed. AI, web, and dev tooling now ships at a pace where years of change land in weeks, and a surprising share of "bugs" are nothing but an old CLI, SDK, or package: fixed upstream months ago, still failing locally. So check versions *before* debugging deeply, not after: the agent harness itself, the platform CLI, the AI SDKs, the project's dependencies. Patch and minor updates in fast-moving ecosystems fix more than they break; take them freely and early. Majors deserve a changelog glance first. A months-old lockfile in anything AI-related is a smell worth acting on, and "it worked last month" is evidence *for* updating, not against it.

The failure this prevents: confidently shipping a model id that's a generation old, a deprecated API call, a library pattern that changed under you, or a wrong binding key, each of which looks right from memory and only breaks live. And its quieter sibling: hours spent debugging a failure that an update had already fixed.
