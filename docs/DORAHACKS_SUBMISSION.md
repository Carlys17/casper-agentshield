# DoraHacks Submission Copy

## Project Name
Casper AgentShield

## One-liner
A policy firewall for autonomous Casper agents that blocks unsafe wallet actions before signing and anchors decisions as Casper Testnet audit proofs.

## Short Description
Casper AgentShield protects AI agents before they sign transactions. It evaluates agent intent, detects prompt injection, enforces network/target/method/spend policies, returns ALLOW / REVIEW_REQUIRED / BLOCK, and anchors deterministic decision hashes on Casper Testnet for auditability.

## Full Description
Autonomous AI agents are becoming capable of paying APIs, calling contracts, rebalancing portfolios, managing treasuries, and interacting with DeFi/RWA workflows. But once an agent has wallet access, a prompt injection or faulty tool call can trigger irreversible on-chain damage.

Casper AgentShield is a security runtime placed between an agent's tool request and wallet signing. Before any transaction handoff, it checks the requested network, target contract, method, amount, and prompt content. Safe actions are allowed, high-risk mainnet actions require review, and malicious or dangerous actions are blocked.

For auditability, each decision produces deterministic hashes: intent_hash, policy_hash, evidence_hash, and decision_hash. The project includes a Rust/WASM Casper session anchor that writes the compact proof to Casper Testnet named keys without exposing sensitive prompt details.

The MVP includes:
- React dashboard for judge walkthroughs.
- TypeScript policy/risk engine.
- Prompt-injection and dangerous-method detection.
- Safe, risky, mainnet-review, and admin-block scenarios.
- Rust/WASM Casper Testnet anchor.
- Live Casper Testnet deploy hash.
- Tests, CI, README, and deployment documentation.

## Casper Buildathon Fit
- Agentic AI: protects autonomous agents before wallet signing.
- DeFi/RWA: useful for yield agents, RWA oracle agents, x402 paid services, DAO treasury agents, and compliance workflows.
- Casper Testnet: live transaction-producing on-chain component.
- Open source: public GitHub repository with README and usage instructions.
- Long-term impact: reusable safety layer for the Casper agent economy.

## Requirement Checklist
- Working prototype deployed on Casper Testnet: Yes. The dashboard and CLI demo are functional, and the BLOCK decision was anchored on Casper Testnet.
- Transaction-producing on-chain component: Yes. The deploy writes AgentShield decision data into Casper account named keys.
- Open-source repository: Yes. The GitHub repository is public and includes README, usage instructions, source code, tests, CI, and deployment documentation.
- Public demo video: Yes. The demo video explains the problem, scenarios, features, walkthrough, and Testnet proof.
- Casper Innovation Track: Yes. The project combines Agentic AI safety, DeFi/RWA transaction risk controls, x402/MCP security-check direction, and Casper audit proofs.

## Final Round Judging Alignment
- Technical Execution: TypeScript policy engine, React dashboard, Rust/WASM Casper anchor, CI, tests, and deployment docs.
- Innovation & Originality: focuses on pre-signing security and auditability for autonomous agents rather than only creating another yield or oracle agent.
- Use of AI / Agentic Systems: designed for autonomous agent tool requests and wallet-action gating.
- Real-World Applicability: relevant for Casper DeFi agents, RWA feeds, DAO treasuries, governance execution, x402 services, and compliance workflows.
- User Experience & Design: judge-ready dashboard with clear ALLOW, BLOCK, and REVIEW_REQUIRED scenarios.
- Working Smart Contracts: Casper Testnet deploy hash and named-key proof are included.
- Long-Term Launch Plans: MCP risk-check server, x402 paid API, proof registry, SDK helpers, and policy templates.
- Potential Long-Term Impact: reusable trust and safety layer for Casper's agent economy.

## GitHub Repository
https://github.com/Carlys17/casper-agentshield

## Demo Video
https://github.com/Carlys17/casper-agentshield/blob/main/demo/casper-agentshield-demo.mp4

Raw MP4:
https://raw.githubusercontent.com/Carlys17/casper-agentshield/main/demo/casper-agentshield-demo.mp4

## Casper Testnet Evidence
Deploy hash:
0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06

Explorer:
https://testnet.cspr.live/deploy/0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06

Account hash:
account-hash-faee5abfbc6fbeda319093a2a9896ab1eff39e2883af2414a27e7a1d18400dda

On-chain named keys:
- agentshield_action_id
- agentshield_component
- agentshield_decision
- agentshield_decision_hash
- agentshield_evidence_hash
- agentshield_intent_hash
- agentshield_policy_hash
- agentshield_risk_score

## Tech Stack
- React + Vite dashboard
- TypeScript policy engine
- Vitest test suite
- Rust/WASM Casper session code
- Odra-style Casper contract source
- Casper Testnet RPC/deploy tooling
- GitHub Actions CI

## How to Run
```bash
npm install
npm test
npm run build
npm run dev
npm run agent:demo
```

## Long-term Plan
AgentShield can evolve into a reusable MCP/x402 security API for Casper agents. Other agents could pay per risk check, receive an ALLOW/BLOCK/REVIEW decision, and anchor or verify compliance proofs on Casper before performing high-value DeFi, RWA, treasury, or governance actions.

Planned roadmap:
1. MCP server exposing `evaluate_intent` for Casper agents.
2. x402 payment flow for pay-per-risk-check usage.
3. Casper proof registry for compact decision-hash anchoring.
4. TypeScript SDK for wallet and agent integrations.
5. Production policy templates for DeFi, RWA, DAO treasury, and compliance use cases.
