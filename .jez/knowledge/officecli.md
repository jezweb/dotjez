---
updated: 2026-06-11
---

# OfficeCLI — making and rendering office docs as an agent

[OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) is a single-binary CLI for creating, reading, and editing Word (`.docx`), Excel (`.xlsx`), and PowerPoint (`.pptx`) without Microsoft Office or wrangling XML. It's built for agents: an embedded MCP server, path-based element access, formula evaluation, and, importantly, it **renders to HTML/PNG so you can screenshot the doc and look at it** before sending it (pairs with the `verify-visually` skill: don't ship a deck or letter you haven't viewed).

Reach for it whenever an agent needs to produce an office document rather than handing back markdown.

```
curl -fsSL https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.sh | bash
officecli create report.pptx
officecli view report.pptx screenshot   # render and look before sending
```
