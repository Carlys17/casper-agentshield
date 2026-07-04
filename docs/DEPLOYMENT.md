# Casper Testnet Deployment Runbook

AgentShield includes a transaction-producing Casper Testnet component: a Rust/WASM session that anchors a compact decision proof by writing named keys to a funded Testnet account.

## Current Testnet evidence

- Public key: `0202e9f14df2d1462e43879fb944eb16060864840d350893b25c16cdb3ed95ae9fc4`
- Account hash: `account-hash-faee5abfbc6fbeda319093a2a9896ab1eff39e2883af2414a27e7a1d18400dda`
- RPC: `https://node.testnet.casper.network`
- Deploy hash: `0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06`
- Explorer: <https://testnet.cspr.live/deploy/0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06>

The secret key is intentionally not committed. The default local path is:

```text
.casper-testnet/agentshield/secret_key.pem
```

## 1. Build the deployable session WASM

On Windows/Git-Bash, this was verified with the GNU nightly toolchain:

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

## 2. Fund a Casper Testnet account

Use the CSPR.live Testnet faucet:

```text
https://testnet.cspr.live/tools/faucet
```

The submitted account has already been funded and used for the live anchor. To reproduce from a new account, request Testnet CSPR for the new public key and place the secret key at the default path above.

## 3. Anchor the sample AgentShield decision

From the repo root:

```bash
bash scripts/deploy-anchor-docker.sh
```

The script mounts the current repo into a Docker container, installs `casper-client`, and sends the session deploy to `casper-test`.

Optional configuration:

```bash
NODE_ADDRESS=https://node.testnet.casper.network \
PAYMENT_AMOUNT=30000000000 \
SECRET_KEY_PATH=.casper-testnet/agentshield/secret_key.pem \
SESSION_WASM=contracts/decision-session/target/wasm32-unknown-unknown/release/agentshield_decision_session.wasm \
bash scripts/deploy-anchor-docker.sh
```

The sample deploy anchors these fields:

- `action_id`: `prompt-injection-drain`
- `decision`: `BLOCK`
- `risk_score`: `90`
- `intent_hash`: `0b8bedee5174c34d3a258b19e74a4b06b67a52d234f9ef315abc3cfe7ecf2a51`
- `policy_hash`: `2a4d132a34c5086569283e9ef4e13a97ad94195cb304eb5a69cc90c3159733c0`
- `evidence_hash`: `e276d8d28c2b43c29e11d35ee0157b9b8011f082bbc37e872832337b3da22686`
- `decision_hash`: `96526a72b11312a15cb456e90aa4aa7d99ee645b242af8eb0badee77f6d304e9`

## 4. Record judge evidence

After redeploying, copy the new deploy hash into:

1. `README.md`
2. `docs/DORAHACKS_SUBMISSION.md`
3. DoraHacks BUIDL submission form
4. Demo video description or pinned comment

Explorer format:

```text
https://testnet.cspr.live/deploy/<DEPLOY_HASH>
```

## Odra source

The richer Odra/Rust proof-registry source is in `contracts/agentshield-policy`. The submitted on-chain proof uses the simpler session WASM path because it is the most reproducible anchor for the qualification round. The Odra registry is the next step for final-round hardening.