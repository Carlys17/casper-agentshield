# Casper AgentShield

**Security runtime for autonomous Casper agents.** AgentShield evaluates AI-agent transaction intents before wallet signing, blocks unsafe actions, and anchors every decision as an auditable Casper Testnet proof.

Built for **Casper Agentic Buildathon 2026**.

## Why it matters
Most hackathon agents can pay, trade, rebalance, or call contracts. The missing layer is safety: a prompt-injected agent with a wallet can drain funds, call unapproved contracts, or hide its reasoning. AgentShield is the policy firewall between **agent intent** and **on-chain settlement**.

## What it does
- Detects prompt-injection patterns before signing.
- Enforces Casper network, target, method, and spend policies.
- Classifies actions as `ALLOW`, `REVIEW_REQUIRED`, or `BLOCK`.
- Produces deterministic `intent_hash`, `policy_hash`, `evidence_hash`, and `decision_hash`.
- Provides Casper on-chain anchoring via Rust/WASM session code plus Odra contract source.
- Offers a judge-ready dashboard with safe, risky, mainnet-review, and dangerous-admin scenarios.

## Quick start
```bash
npm install
npm test
npm run build
npm run dev
```

## CLI demo
```bash
npm run agent:demo
npm run casper:hash prompt-injection-drain
```

## Architecture
```text
AI Agent Intent / Tool Request
        |
        v
AgentShield Policy Engine
  - prompt injection scan
  - target/method allowlist
  - spend cap
  - network policy
  - intent mismatch check
        |
        +--> BLOCK before wallet signing
        +--> REVIEW_REQUIRED for human approval
        +--> ALLOW then sign/broadcast
        |
        v
Casper Testnet AgentShield anchor
  session code writes verified decision fields to account named keys:
  agentshield_action_id, agentshield_decision, agentshield_risk_score,
  agentshield_intent_hash, agentshield_policy_hash,
  agentshield_evidence_hash, agentshield_decision_hash
```

## Casper fit
- **Agentic AI:** protects autonomous agents before irreversible wallet actions.
- **DeFi/RWA applicability:** useful for yield agents, RWA oracles, x402 services, treasury agents, and compliance workflows.
- **Working smart contracts:** Odra/Rust contract source in `contracts/agentshield-policy` and deployable Casper WASM session anchor in `contracts/decision-session`.
- **x402 path:** AgentShield can become a paid MCP/x402 security check API for other agents.
- **Long-term impact:** a reusable safety layer for the Casper agent economy.

## Casper Testnet anchor status

A Casper testnet keypair has been generated locally for this project. The secret key is intentionally ignored by Git.

- Public key: `01b6b05f87bc0f8f5b25a9af3783e6c3ef75cd524b476a10f9769d5cff82a6db26`
- Account hash: `account-hash-0b420c9b3ea75511de3a6bc96a8ecc1a1762446f2c9ee024f62041d3f30cc04b`
- Public RPC checked: `https://node.testnet.casper.network`
- Deployable WASM: `contracts/decision-session/target/wasm32-unknown-unknown/release/agentshield_decision_session.wasm`
- WASM SHA-256: `a5f9dbb062233741cb9eba4f44f46a648ef47e3f873658d0d7e772521b0265e3`
- Sample decision hash: `96526a72b11312a15cb456e90aa4aa7d99ee645b242af8eb0badee77f6d304e9`

To finish the public on-chain proof, fund the public key above with Casper Testnet CSPR via <https://testnet.cspr.live/tools/faucet>, then run:

```bash
bash scripts/deploy-anchor-docker.sh
```

Current unfunded deploy attempt reached the public testnet RPC and returned `Invalid Deploy: no such addressable entity`, which is expected before the faucet creates/funds the account.

## Honest MVP status
The local prototype, test suite, dashboard, deployable WASM session contract, and Odra contract source are included. Live DoraHacks submission evidence needs one funded Casper Testnet deploy hash added here and in the DoraHacks BUIDL.
