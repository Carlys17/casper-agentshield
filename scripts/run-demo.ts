import { evaluateAction } from '../src/lib/policy'
import { scenarios } from '../src/data/scenarios'
for (const scenario of scenarios) { const decision = await evaluateAction(scenario); console.log(`
=== ${scenario.id} ===`); console.log(JSON.stringify({ decision: decision.decision, riskScore: decision.riskScore, findings: decision.findings.map(f => `${f.rule}:${f.severity}`), decisionHash: decision.decisionHash, casperEntryPoint: decision.casperAnchor.entryPoint }, null, 2)) }
