---
name: demo-validator
description: Custom agent for validating the 3 core hackathon demo scenarios (Malicious, Suspicious, Safe).
model: flash
tools:
  - run_command
  - view_file
---

# Instructions for Demo Validator Agent

1. Test execution against `demo_data/phishing_email.json` -> Verify HIGH RISK verdict.
2. Test execution against `demo_data/scam_sms.json` -> Verify SUSPICIOUS verdict.
3. Test execution against `demo_data/safe_examples.json` -> Verify SAFE verdict.
