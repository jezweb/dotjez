# Onboard me (set up about.md)

> The agent runs this on first use, or whenever `about.md` is still placeholders, to learn who it's working for. Offer the user a choice of two paths, then write the result into `about.md`.

Tell the user there are two ways to do this, their pick.

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

Take what they paste, tidy it, and write it into `about.md`. Keep the "unsure about" items flagged so they get confirmed, don't quietly turn a guess into a fact.

## Path B — answer a few questions (fresh start)

If they'd rather just talk, ask these one at a time, acknowledging each answer before the next. Don't interrogate; stop when you have enough to be useful.

1. What should I call you, and what do you do?
2. What are you working on right now?
3. How do you like me to write and talk? (tone, spelling, anything to avoid, e.g. no em dashes)
4. Who are the key people, clients, or projects I should know about?
5. What are you trying to get done over the next while?

## Then

Write `about.md` (who I am / what I work on / what I'm working toward / how I like to work). If they gave a lot, split it into an `about/` folder: `voice.md` (how I write, with a couple of "I'd love this / I'd hate this" examples), `expertise.md` (when to be brief vs thorough), `business.md`, `people.md`. Start as one file; grow it only when it earns the split.
