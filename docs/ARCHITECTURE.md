# Architecture

The CLI is the control surface. `core.js` owns JSON state, task transitions, approval records, command execution, SHA-256 fingerprints, receipts, checkpoints and static dashboard generation. `.reposentinel/project.json` stores project identity; `tasks.json` and `approvals.json` track work and decisions; `receipts/` and `checkpoints/` retain run evidence. The dashboard is generated HTML and has no command execution path.

Fingerprints detect simple source drift, not semantic correctness. A test suite can be incomplete or malicious. The verifier runs in the user's environment and is not a sandbox.