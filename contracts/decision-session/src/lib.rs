#![no_std]
#![no_main]

extern crate alloc;

use alloc::string::{String, ToString};
use casper_contract::contract_api::{runtime, storage};

#[no_mangle]
pub extern "C" fn call() {
    let action_id: String = runtime::get_named_arg("action_id");
    let decision: String = runtime::get_named_arg("decision");
    let risk_score: u8 = runtime::get_named_arg("risk_score");
    let intent_hash: String = runtime::get_named_arg("intent_hash");
    let policy_hash: String = runtime::get_named_arg("policy_hash");
    let evidence_hash: String = runtime::get_named_arg("evidence_hash");
    let decision_hash: String = runtime::get_named_arg("decision_hash");

    runtime::put_key("agentshield_action_id", storage::new_uref(action_id).into());
    runtime::put_key("agentshield_decision", storage::new_uref(decision).into());
    runtime::put_key("agentshield_risk_score", storage::new_uref(risk_score).into());
    runtime::put_key("agentshield_intent_hash", storage::new_uref(intent_hash).into());
    runtime::put_key("agentshield_policy_hash", storage::new_uref(policy_hash).into());
    runtime::put_key("agentshield_evidence_hash", storage::new_uref(evidence_hash).into());
    runtime::put_key("agentshield_decision_hash", storage::new_uref(decision_hash).into());
    runtime::put_key("agentshield_component", storage::new_uref("Casper AgentShield Decision Anchor".to_string()).into());
}
