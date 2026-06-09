> Example showing the shape (a lightweight ADR). Copy it for a real decision; delete the sample once you've got the idea.

# Decision: use Xero for invoicing, not spreadsheets

**Date:** 2026-06-09 · **Status:** accepted

## Context
Invoicing was a monthly spreadsheet one person owned and everyone else guessed at. We needed something the whole team could see, that chased payments for us.

## Decision
Move invoicing and quotes to Xero.

## Why
- One source of truth for who owes what.
- Automatic payment reminders, so we chase less by hand.
- The accountant already works in it.

## Trade-offs
- A monthly cost per seat.
- Everyone has to learn it, and the old spreadsheets need importing once.

Record a decision when the *why* would be expensive to reconstruct later. A one-line choice doesn't need a file; a fork in the road does. A decision to **stop** using something earns a file too, otherwise a future session confidently re-proposes the thing you already tried and walked away from.
