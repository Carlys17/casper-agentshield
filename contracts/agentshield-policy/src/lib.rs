//! Casper AgentShield DecisionLog contract material.
//! Build with: cargo install cargo-odra --locked && cargo odra build -b casper

use odra::prelude::*;

#[odra::module]
pub struct AgentShieldDecisionLog {
    decisions: Var<Vec<DecisionRecord>>,
}

#[odra::odra_type]
pub struct DecisionRecord {
    pub action_id: String,
    pub decision: String,
    pub risk_score: u8,
    pub intent_hash: String,
    pub policy_hash: String,
    pub evidence_hash: String,
    pub decision_hash: String,
    pub recorded_at: u64,
}

#[odra::module]
impl AgentShieldDecisionLog {
    pub fn init(&mut self) {
        self.decisions.set(Vec::new());
    }

    pub fn record_decision(
        &mut self,
        action_id: String,
        decision: String,
        risk_score: u8,
        intent_hash: String,
        policy_hash: String,
        evidence_hash: String,
        decision_hash: String,
    ) {
        assert!(risk_score <= 100, "risk score must be <= 100");

        let mut records = self.decisions.get_or_default();
        records.push(DecisionRecord {
            action_id,
            decision,
            risk_score,
            intent_hash,
            policy_hash,
            evidence_hash,
            decision_hash,
            recorded_at: 0,
        });
        self.decisions.set(records);
    }

    pub fn total_decisions(&self) -> u32 {
        self.decisions.get_or_default().len() as u32
    }

    pub fn get_decision(&self, index: u32) -> DecisionRecord {
        self.decisions
            .get_or_default()
            .get(index as usize)
            .cloned()
            .expect("missing decision")
    }
}