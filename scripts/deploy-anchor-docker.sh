#!/usr/bin/env bash
set -euo pipefail

NODE_ADDRESS="${NODE_ADDRESS:-https://node.testnet.casper.network}"
PAYMENT_AMOUNT="${PAYMENT_AMOUNT:-30000000000}"
PROJECT_DIR="${PROJECT_DIR:-/c/Users/pardo/casper-agentshield}"

MSYS_NO_PATHCONV=1 docker run --rm \
  -v "${PROJECT_DIR}:/work" \
  -w /work \
  rust:1-bookworm bash -lc "
    set -euo pipefail
    source /usr/local/cargo/env
    apt-get update >/dev/null
    apt-get install -y pkg-config libssl-dev build-essential >/dev/null
    cargo install casper-client --locked >/dev/null
    casper-client put-deploy \
      --node-address '${NODE_ADDRESS}' \
      --chain-name casper-test \
      --secret-key .casper-testnet/agentshield/secret_key.pem \
      --payment-amount '${PAYMENT_AMOUNT}' \
      --session-path contracts/decision-session/target/wasm32-unknown-unknown/release/agentshield_decision_session.wasm \
      --session-arg \"action_id:string:'prompt-injection-drain'\" \
      --session-arg \"decision:string:'BLOCK'\" \
      --session-arg \"risk_score:u8:'90'\" \
      --session-arg \"intent_hash:string:'0b8bedee5174c34d3a258b19e74a4b06b67a52d234f9ef315abc3cfe7ecf2a51'\" \
      --session-arg \"policy_hash:string:'2a4d132a34c5086569283e9ef4e13a97ad94195cb304eb5a69cc90c3159733c0'\" \
      --session-arg \"evidence_hash:string:'e276d8d28c2b43c29e11d35ee0157b9b8011f082bbc37e872832337b3da22686'\" \
      --session-arg \"decision_hash:string:'96526a72b11312a15cb456e90aa4aa7d99ee645b242af8eb0badee77f6d304e9'\"
  "
