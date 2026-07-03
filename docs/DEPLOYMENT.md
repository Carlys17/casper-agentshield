# Casper Testnet Deployment Runbook

AgentShield is designed to meet the Buildathon requirement: a working prototype with a transaction-producing on-chain component.

## Current prepared account

Funded Casper Wallet testnet account used for the live anchor:

- Public key: `0202e9f14df2d1462e43879fb944eb16060864840d350893b25c16cdb3ed95ae9fc4`
- Account hash: `account-hash-faee5abfbc6fbeda319093a2a9896ab1eff39e2883af2414a27e7a1d18400dda`
- Public RPC: `https://node.testnet.casper.network`
- Deploy hash: `0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06`
- Explorer: <https://testnet.cspr.live/deploy/0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06>

Secret key path is local-only and ignored by Git: `.casper-testnet/agentshield/secret_key.pem`.

## 1. Build the deployable Casper session WASM

This build is verified on Windows/Git-Bash using the GNU nightly toolchain:

```bash
cd contracts/decision-session
rustup toolchain install nightly-2025-01-01-x86_64-pc-windows-gnu --profile minimal
rustup +nightly-2025-01-01-x86_64-pc-windows-gnu target add wasm32-unknown-unknown
cargo +nightly-2025-01-01-x86_64-pc-windows-gnu build --release --target wasm32-unknown-unknown
```

Verified artifact:

```text
contracts/decision-session/target/wasm32-unknown-unknown/release/agentshield_decision_session.wasm
size: 26,539 bytes
sha256: a5f9dbb062233741cb9eba4f44f46a648ef47e3f873658d0d7e772521b0265e3
```

## 2. Fund the account

CSPR.live faucet requires signing in with a compatible wallet, so CLI-only faucet claiming was not possible from Hermes.

Open:

```text
https://testnet.cspr.live/tools/faucet
```

The account used for this submission has already been funded and anchored. To reproduce from a new account, request testnet CSPR for that new account public key.

Submission account public key:

```text
0202e9f14df2d1462e43879fb944eb16060864840d350893b25c16cdb3ed95ae9fc4
```

## 3. Anchor the sample AgentShield decision

From repo root run:

```bash
bash scripts/deploy-anchor-docker.sh
```

The script uses Docker to install `casper-client` in an isolated Linux container and sends `contracts/decision-session/.../agentshield_decision_session.wasm` to `casper-test` with these decision fields:

- `action_id`: `prompt-injection-drain`
- `decision`: `BLOCK`
- `risk_score`: `90`
- `intent_hash`: `0b8bedee5174c34d3a258b19e74a4b06b67a52d234f9ef315abc3cfe7ecf2a51`
- `policy_hash`: `2a4d132a34c5086569283e9ef4e13a97ad94195cb304eb5a69cc90c3159733c0`
- `evidence_hash`: `e276d8d28c2b43c29e11d35ee0157b9b8011f082bbc37e872832337b3da22686`
- `decision_hash`: `96526a72b11312a15cb456e90aa4aa7d99ee645b242af8eb0badee77f6d304e9`

## 4. Record judge evidence

Live deploy hash already recorded:

```text
0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06
```

If you redeploy, copy the new deploy hash from `casper-client` output and add it to:

1. `README.md`
2. DoraHacks BUIDL submission
3. Demo video narration/screen capture

CSPR.live explorer format:

```text
https://testnet.cspr.live/deploy/<DEPLOY_HASH>
```

## Odra source

The richer Odra/Rust contract source remains in `contracts/agentshield-policy`. On this Windows environment, syntax checking passed earlier, but the direct Odra build path was less reliable than the plain Casper session WASM above. For submission, the session WASM is the safer on-chain proof path.
