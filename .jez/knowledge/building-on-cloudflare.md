---
updated: 2026-06-11
---

# Building a website or app on Cloudflare

Don't start from a blank folder. Scaffold from one of the starters, then let the agent plan and build with you. Two starters, pick by what you're making:

- **[cf-astro-starter](https://github.com/jezweb/cf-astro-starter)** (public, MIT): a simple, fast **content website**: static pages on Cloudflare. The right choice for a brochure site, a landing page, a small-business site. It ships with **[GOING-LIVE.md](https://github.com/jezweb/cf-astro-starter/blob/main/GOING-LIVE.md)**, a newcomer walkthrough from first deploy to your own domain, no Cloudflare experience assumed; `MODULES.md` lists the optional pieces.
- **[vite-flare-starter](https://github.com/jezweb/vite-flare-starter)**: the **complex app** version, React 19 + Hono + D1 + Drizzle + better-auth + Tailwind v4 + shadcn/ui + R2 + Workers AI. The right choice for a dashboard, a logged-in app, anything with a database and AI. Follow its README to set up, and its **[GOING-LIVE.md](https://github.com/jezweb/vite-flare-starter/blob/main/GOING-LIVE.md)** to ship (D1 migrations, secrets, auth as well as deploy and domain).

## The path for a newcomer

1. **Clone the right starter** into a new folder, `npm install`, open your agent in it.
2. **Plan before building.** Ask the agent to interview you about what it's for, who it's for, what pages, and the look, and save that to `PLAN.md` (the `imagine` and `challenge` skills help here). The plan stays in the folder, so every later session remembers where you're up to.
3. **Build.** Edit the config, write the content or pages, run the dev server to see it live as you go.
4. **Go live.** Follow the starter's `GOING-LIVE.md`: a free `.workers.dev` URL in minutes, then point your own domain when ready.

The manuals live in the starters, not here. This file is the map: which starter, and the shape of the journey. Pairs with `plan-and-build` (and scope the starter's current docs before designing on top of it, per `verify-current`).
