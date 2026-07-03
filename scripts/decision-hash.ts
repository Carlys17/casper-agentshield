import { evaluateAction } from '../src/lib/policy'
import { scenarios } from '../src/data/scenarios'
const id = process.argv[2] ?? scenarios[0].id; const scenario = scenarios.find(s => s.id === id); if (!scenario) throw new Error(`Unknown scenario ${id}`); const decision = await evaluateAction(scenario); console.log(decision.decisionHash)
