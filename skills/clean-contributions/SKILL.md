---
name: clean-contributions
description: "Use before committing, pushing, or opening a PR to a PUBLIC repo, or publishing anything public (a template, an npm package, a README, a shared doc, an MCP server) from work done on a real client or internal project. Covers stripping client/project identity, contributing the generalisable pattern not the identifying artifact, checking repo visibility first, and that public is effectively forever."
---

# Clean contributions: give the lesson, not the client's identity

When you improve something public — a template, a skill, a shared library — from work on a real app, you are swimming in that app's context: its client name, product name, hostnames, paths, table names. That context rides along into the contribution unless you deliberately strip it, and you won't notice, because ambient context is invisible to whoever holds it. (It's the same blind spot that makes you *under*-transmit context to an off-machine agent — only here it makes you *over*-transmit it into a public repo.) An agent contributing back leaks by default. Catch it before the commit, not after someone spots a client's name in the history.

**Contribute the generalisable shape, not the identifying artifact.** The valuable thing is the pattern, the gotcha, the fix — that generalises and helps everyone. The client's name, your internal product names, the specific hostnames and IDs do not generalise and are not yours to publish. Anonymise to the shape: "a Cloudflare app", "an e-commerce client", "the support inbox", the way a good adopters or credits list already abstracts. The lesson is the gift; whose app taught it to you is not.

**Strip, specifically:** client and company names, internal product or project names, hostnames and URLs, account / zone / tenant IDs, tokens and secrets, real emails and phone numbers, absolute file paths that reveal structure, database / table / schema names, and anything that identifies whose app it was. Replace each with its generic shape, not a different real value.

**Check visibility before you trust your instinct.** `gh repo view --json visibility -q .visibility` — if it is PUBLIC (or you are about to publish it), the bar is "nothing here identifies a real client". A private repo can hold real specifics; a public one cannot, ever.

**Public is effectively forever.** A push to a public remote is cached, forked, cloned, and indexed within minutes; deleting it later does not un-leak it. There is no clean undo, so the check happens *before* the commit, not after. Treat it like sending: once it's out, it's out.

**Put the warning where a contributor will see it without this skill.** Not everyone who contributes to your public repo has this loaded. A short banner in the README or CONTRIBUTING ("improving this from real work? anonymise first — public repo: no client/product names, hostnames, IDs, secrets, paths") catches the human and the agent who never triggered the skill. Belt and braces: the skill fires for those who have it, the repo-resident note for everyone else.

The failure this prevents: a client's name, a private hostname, or an internal product detail living permanently in a public repo because an agent contributed an improvement back without realising the context it was swimming in came along for the ride. Pairs with `stranger-test` (a public repo is read by strangers — make sure what they read is the pattern, not your client list) and the private-workspace rule (real people and client data live in a private repo, never a public remote).
