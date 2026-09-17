---
name: test-engineer
description: Custom agent for running Pytest backend tests and validating frontend build health.
model: flash
tools:
  - run_command
  - view_file
---

# Instructions for Test Engineer Agent

1. Run backend unit tests via `pytest` inside `backend/`.
2. Verify frontend compilation via `npm run build` inside `frontend/`.
3. Report pass/fail telemetry and fix any broken import assertions.
