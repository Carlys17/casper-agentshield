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

## Demo video

Watch the 2:33 judge walkthrough: [`demo/casper-agentshield-demo.mp4`](demo/casper-agentshield-demo.mp4)

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

## Buildathon requirement mapping

| Casper Agentic Buildathon requirement | AgentShield evidence |
| --- | --- |
| Working prototype on Casper Testnet | Dashboard, CLI demo, policy engine, and live Casper Testnet anchor. |
| Transaction-producing on-chain component | Deploy hash `0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06` writes AgentShield named keys. |
| Open-source repository with README and usage instructions | This public repository includes setup, demo, architecture, deployment evidence, tests, and submission docs. |
| Public demo video | `demo/casper-agentshield-demo.mp4` explains problem, features, scenarios, Testnet proof, and walkthrough. |
| Casper Innovation Track | Combines Agentic AI safety, DeFi/RWA wallet-risk controls, x402/MCP security-check path, and Casper on-chain audit proofs. |
| Final-round judging readiness | Includes technical execution, UI, smart-contract evidence, originality, real-world applicability, and long-term launch plan. |

## Long-term launch plan

AgentShield can become a reusable MCP/x402 security service for the Casper agent ecosystem:

1. **MCP risk-check server:** expose `evaluate_intent` so yield agents, RWA oracle agents, and DAO agents can request ALLOW/BLOCK/REVIEW before signing.
2. **x402 paid API:** let other agents pay per risk check and receive signed policy decisions.
3. **Casper proof registry:** anchor compact decision proofs for compliance, user safety, and post-incident auditability.
4. **Integrator SDK:** provide TypeScript helpers for Casper agent wallets and dashboards.
5. **Production hardening:** add policy templates for DeFi treasuries, RWA feeds, governance execution, and compliance workflows.

## Casper Testnet anchor status

A Casper Wallet testnet account was funded and used to anchor the AgentShield decision proof. The secret key is intentionally ignored by Git.

- Public key: `0202e9f14df2d1462e43879fb944eb16060864840d350893b25c16cdb3ed95ae9fc4`
- Account hash: `account-hash-faee5abfbc6fbeda319093a2a9896ab1eff39e2883af2414a27e7a1d18400dda`
- Public RPC checked: `https://node.testnet.casper.network`
- Deployable WASM: `contracts/decision-session/target/wasm32-unknown-unknown/release/agentshield_decision_session.wasm`
- WASM SHA-256: `a5f9dbb062233741cb9eba4f44f46a648ef47e3f873658d0d7e772521b0265e3`
- Sample decision hash: `96526a72b11312a15cb456e90aa4aa7d99ee645b242af8eb0badee77f6d304e9`
- Casper Testnet deploy hash: `0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06`
- Explorer: <https://testnet.cspr.live/deploy/0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06>

The anchor was submitted with:

```bash
bash scripts/deploy-anchor-docker.sh
```

RPC verification shows the account now has AgentShield named keys: `agentshield_action_id`, `agentshield_decision`, `agentshield_risk_score`, `agentshield_intent_hash`, `agentshield_policy_hash`, `agentshield_evidence_hash`, and `agentshield_decision_hash`.

## Honest MVP status
The local prototype, test suite, dashboard, deployable WASM session contract, Odra contract source, and live Casper Testnet anchor evidence are included.
