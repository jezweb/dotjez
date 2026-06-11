# secrets

This folder is about **where credentials go, and where they don't.**

- Working keys, dev creds, admin URLs, account IDs can live here, one markdown file per service. This folder is **never committed to git** (it's in `.gitignore`, apart from this note).
- High-stakes credentials (account-root tokens, payment keys, identity-recovery creds, production signing keys) do **not** belong in a file at all. Put them in a password manager.
- This starter ships the folder empty apart from this note. Add your own files locally, and double-check they never land in a commit.
- Git ignores this folder, but **backups and sync tools don't** — anything that copies the whole workspace (a backup app, cloud sync) carries this folder with it. That's fine for an encrypted backup you own; just decide it deliberately rather than discovering it.
