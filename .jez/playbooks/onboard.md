# Onboard me (set up about.md)

> The agent runs this on first use, or whenever `about.md` carries `status: placeholder` (or still reads like the shipped template), to learn who it's working for. Offer a choice of paths, then write the result into `about.md` and delete its `status: placeholder` line.

Usually you're profiling the **human** who owns the workspace, that's the default; assume it unless the user clearly says otherwise. (The one exception: if this folder is an **agent's** own working context, run the same paths to *define the agent* instead, its role, voice, expertise, and mandate, prescribing a persona rather than describing a person.)

Tell the user there are a few ways to do this, their pick.

## Path A — borrow from an AI that already knows you (fastest)

If they already use ChatGPT, Claude, Gemini, or similar, have them paste this into it and bring back the answer:

```
Write a markdown profile of me for a new AI assistant, drawing on what you've
learned about me from our past conversations. Be specific, not generic. If
you're guessing, say so. Cover:

1. Who I am — name, role, what I do, what I'm like to work with.
2. How I talk — words I use, words I avoid, tone, spelling (e.g. AU/US English),
   what gets a reaction out of me.
3. What I do — a typical week, the tools I rely on, what energises vs drains me.
4. My business or role — what it does, who the customers are, the current focus.
5. The people in my world — team, contractors, key clients.

800–1500 words. End with a "What I'm unsure about" section listing anything you
guessed or don't know.
```

Take what they paste, tidy it, and write it into `about.md`. Keep the "unsure about" items flagged so they get confirmed, don't quietly turn a guess into a fact. Two checks before you save: if the paste is thin, top it up with a couple of the Path B questions rather than calling setup done on three vague lines; and the profile may surface personal detail (the people in their world, what gets a reaction out of them), so it's worth a quick "happy for all this to go in `about.md`?" before persisting it, this is a durable file.

## Path B — answer a few questions (fresh start)

If they'd rather just talk, ask these one at a time, acknowledging each answer before the next. Don't interrogate; stop when you have enough to be useful.

1. What should I call you, and what do you do?
2. What are you working on right now?
3. How do you like me to write and talk? (tone, spelling, anything to avoid, e.g. no em dashes)
4. Who are the key people, clients, or projects I should know about?
5. What are you trying to get done over the next while?

## Path C — let me go and learn (with your permission)

If they'd rather you find out for yourself, and they're comfortable with it, offer to learn from their own work. Ask first, use what you have access to, and distil what you learn into `about.md` / `about/voice.md`, don't copy private content around.

- **Their GitHub** — what they build and their stack (`gh repo list`, skim a few READMEs).
- **Their work folders** — skim the docs or code they point you at, to see what they actually do.
- **Their sent email** — the richest source for *how they write*. A handful of real sent messages teaches their voice better than any description. Lands in `about/voice.md`.
- **Their chat history** — if they already chat with an AI, the paste in Path A is the easy version of this.

These depend on access you may or may not have (a GitHub login, a mail tool, a folder path). Offer them, use what's available, skip what isn't. Sent-email and chat are sensitive, only with a clear yes.

## Then

Write `about.md` (who I am / what I work on / what I'm working toward / how I like to work). If they gave a lot, split it into an `about/` folder: `voice.md` (how I write, with a couple of "I'd love this / I'd hate this" examples), `expertise.md` (when to be brief vs thorough), `business.md`, `people.md`. Start as one file; grow it only when it earns the split.

Last, make the workspace theirs. If it's still the cloned starter, the git remote points at the public template: re-point `origin` to a private repo of their own, or remove the remote entirely (if they don't use GitHub, removing it is the default; local-only is fine). Then make the first commit. Skills need no installing for work in this workspace (you read them from `skills/` as files); offer the global install or plugin only if they want the skills in other folders too. From here on, commit when you journal at session end: this folder is becoming the durable record of their work, and it deserves version history and a backup.

If they work in folders *outside* this workspace too, close the discovery gap: the workspace briefs only load when the agent is opened in (or under) this folder, so a session started elsewhere doesn't know the workspace exists. Offer to add a one-line pointer to their agent's global config (for Claude Code, `~/.claude/CLAUDE.md`), something like: *"My cross-project workspace lives at `<path>`; check its `.jez/` for context about me and my work before researching from scratch."* And offer the skills as a global install (see `skills/README.md`) so the how-to-work habits travel everywhere as well.

The shipped samples clean themselves up over time, not now: each "example showing the shape" file stays until a real file replaces it (the examples are the templates you copy), and `sample-project/` goes once they have a real project of their own. Don't sweep them during onboarding; bin each one the first time you create the real thing beside it.
