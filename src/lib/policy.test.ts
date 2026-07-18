import { describe, expect, it } from 'vitest'
import { scenarios } from '../data/scenarios'
import { evaluateAction } from './policy'

describe('AgentShield policy engine', () => {
  it('allows a small approved x402 payment on testnet', async () => {
    const decision = await evaluateAction(scenarios[0])

    expect(decision.decision).toBe('ALLOW')
    expect(decision.riskScore).toBe(0)
    expect(decision.decisionHash).toMatch(/^[a-f0-9]{64}$/)
  })

  it('blocks prompt injection and wallet drain attempts before signing', async () => {
    const decision = await evaluateAction(scenarios[1])
    const rules = decision.findings.map((finding) => finding.rule)

    expect(decision.decision).toBe('BLOCK')
    expect(rules).toContain('prompt.injection')
    expect(rules).toContain('spend.single_cap')
  })

  it('requires review for mainnet actions', async () => {
    const decision = await evaluateAction(scenarios[2])

    expect(decision.decision).toBe('REVIEW_REQUIRED')
    expect(decision.findings.map((finding) => finding.rule)).toContain('network.mainnet_review')
  })

  it('blocks dangerous admin methods', async () => {
    const decision = await evaluateAction(scenarios[3])

    expect(decision.decision).toBe('BLOCK')
    expect(decision.findings.map((finding) => finding.rule)).toContain('method.dangerous')
  })

  it('blocks unlimited approval attempts', async () => {
    const decision = await evaluateAction(scenarios[4])

    expect(decision.decision).toBe('BLOCK')
    expect(decision.findings.map((finding) => finding.rule)).toContain('method.dangerous')
  })

  it('flags unknown targets with a warning', async () => {
    const decision = await evaluateAction(scenarios[5])

    expect(decision.decision).toBe('ALLOW')
    expect(decision.findings.map((finding) => finding.rule)).toContain('target.allowlist')
  })

  it('blocks intent-mismatch drain attempts', async () => {
    const decision = await evaluateAction(scenarios[6])

    expect(decision.decision).toBe('REVIEW_REQUIRED')
    expect(decision.findings.map((finding) => finding.rule)).toContain('target.allowlist')
    expect(decision.findings.map((finding) => finding.rule)).toContain('spend.single_cap')
  })
})