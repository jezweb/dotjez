---
name: verify-visually
description: Use before calling any visual or rendered output done, a UI, a layout, a generated image, a rendered document, a chart. Render the real thing and look at the actual result (playwright or Chrome screenshot, computer-use, or the project's own render/export command) before you ship it. Don't report "looks good" on something you never viewed.
---

# Verify visually: render it and look

A green build, a passing test, and "looks good" are not the same as *you looked at it*. For anything that ends up on a screen, a UI, a layout, a generated image, a rendered document, a chart, render the real thing and inspect the actual result before calling it done. Agents skip this constantly and ship clipped layouts, wrong images, and flat-styled docs that compiled cleanly.

**Render the real output, then look.** Use whatever produces the actual artifact:
- Web UI: screenshot it (playwright, or Chrome) at a real viewport. For responsive work, check a few widths (mobile, tablet, desktop), not just one.
- A desktop or app UI you can't script: computer-use to drive and capture it.
- Generated docs, decks, images: render to a file and open it (the project's own view or export command).

**Instrument what eyes miss.** Looking catches layout; a quick DOM query catches the rest, phantom scrollbars, broken images (`naturalWidth === 0`), non-semantic clickables, missing aria-labels. Run a script for those rather than trusting a glance.

**Mind the capture traps.** Screenshots on a Retina display come back 2x and oversized; cap them (`sips -Z 1440`) before committing or re-reading them, or they blow the context budget. Don't trigger native dialogs or alerts in a scripted browser, they block the session.

The failure this prevents: shipping the broken layout, the clipped button, the wrong or missing image, the heading that rendered flat, because a passing build told you it was done and nobody opened the page. This is the visual arm of "verify by inspection" (see `plan-and-build`): for visual work, inspection means render and look.
