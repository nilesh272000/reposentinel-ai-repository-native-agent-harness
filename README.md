# RepoSentinel AI — Repository-Native Agent Development Harness

A dependency-free Node.js CLI for structured AI-assisted development: persistent project context, task tracking, human-entered approvals, verification receipts, stale-evidence detection, checkpoints and a static dashboard.

This is an independent implementation inspired by the general problem space of repository-native coding-agent workflows. It is not a fork, port or reproduction of Genesis Kit.

## Features
- Initialize `.reposentinel/` state without reorganizing application code.
- Capture project objective and starter acceptance contract.
- Track tasks, dependencies, priorities and verification commands.
- Record explicit approval before completion.
- Execute checks on demand and save JSON receipts with exit codes and SHA-256 repository fingerprints.
- Reject completion when evidence failed or became stale.
- Generate compact Markdown context briefs for coding assistants.
- Save checkpoints and inspect incomplete tasks after interruption.
- Generate a static, read-only HTML dashboard.

## Requirements
Node.js 18+. No npm dependencies or API keys.

## Quick start
```bash
node src/cli.js init . --name "Sample App" --objective "Build a sample application"
node src/cli.js task add . --id T-1 --title "Run tests" --check "node --test"
node src/cli.js approve . T-1 --by "Project Owner" --reason "Reviewed scope"
node src/cli.js verify . T-1
node src/cli.js complete . T-1
node src/cli.js brief .
node src/cli.js dashboard .
```

## Commands
`init`, `status`, `task add`, `task list`, `approve`, `verify`, `complete`, `brief`, `checkpoint`, `recover`, `dashboard`. Run `node src/cli.js help` for syntax.

## Tests
```bash
npm test
npm run check
```

## Safety boundaries
Verification commands are executable code and run with the current user's permissions. This is not a sandbox. Fingerprints detect changes but do not prove correctness. Approval records are local metadata, not cryptographic identity. The dashboard is static and read-only. Use independent code review and security review.
