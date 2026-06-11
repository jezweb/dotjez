---
updated: 2026-06-11
---

# Google Workspace CLI (`gws`) — acting in Gmail, Drive, Calendar, Docs, Sheets, Chat

[`@googleworkspace/cli`](https://github.com/googleworkspace/cli) is a unified CLI for Google Workspace, published under Google's `googleworkspace` org (their README notes it's not an officially supported Google product): Gmail, Drive, Calendar, Sheets, Docs, Chat, and Admin, all through one `gws` command, with structured JSON output and built-in agent skills. It generates its command surface from Google's Discovery Service, so new API endpoints appear automatically.

Reach for it when an agent needs to act *in* Workspace as the owner (read or send mail in their own thread, manage Drive, create a doc) rather than through a separate integration.

```
npm install -g @googleworkspace/cli
gws auth setup
```

It's the `gws` behind sending email *as the owner* (their thread, their Sent, their signature), which is usually what "email this client" actually means, as opposed to a generic from-the-app send.
