import { useEffect, useMemo, useState } from 'react'
import './style.css'
import { defaultPolicy, evaluateAction } from './lib/policy'
import type { AgentAction, ShieldDecision } from './lib/types'
import { scenarios } from './data/scenarios'

const TESTNET_PROOF = {
  deployHash: '0073e5c2595185eb9145ce60dbf9ac40d779f6fe6985dbd138701a4a72dd0e06',
  accountHash: 'account-hash-faee5abfbc6fbeda319093a2a9896ab1eff39e2883af2414a27e7a1d18400dda',
  network: 'casper-test',
}

function App() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id)
  const [customPrompt, setCustomPrompt] = useState('')
  const [decision, setDecision] = useState<ShieldDecision | null>(null)

  const base = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0],
    [selectedId],
  )

  const action: AgentAction = useMemo(
    () => ({ ...base, prompt: customPrompt || base.prompt }),
    [base, customPrompt],
  )

  useEffect(() => {
    let active = true

    evaluateAction(action).then((nextDecision) => {
      if (active) setDecision(nextDecision)
    })

    return () => {
      active = false
    }
  }, [action])

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Casper Agentic Buildathon 2026</p>
          <h1>Casper AgentShield</h1>
          <p className="subtitle">
            A pre-signing security runtime for autonomous Casper agents. It blocks unsafe
            wallet actions, requests review for high-risk intent, and anchors compact audit
            proofs on Casper Testnet.
          </p>
        </div>
        <div className="scorecard">
          <span>Decision</span>
          <strong className={decision?.decision.toLowerCase()}>
            {decision?.decision ?? '...'}
          </strong>
          <small>Risk score: {decision?.riskScore ?? '...'}/100</small>
        </div>
      </section>

      <section className="grid two">
        <article className="panel">
          <h2>1. Agent action request</h2>
          <label htmlFor="scenario">Scenario</label>
          <select
            id="scenario"
            value={selectedId}
            onChange={(event) => {
              setSelectedId(event.target.value)
              setCustomPrompt('')
            }}
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.id}
              </option>
            ))}
          </select>

          <label htmlFor="prompt">Prompt / tool request</label>
          <textarea
            id="prompt"
            value={customPrompt || base.prompt}
            onChange={(event) => setCustomPrompt(event.target.value)}
            rows={7}
          />

          <div className="facts">
            <span>
              Agent <b>{action.agentId}</b>
            </span>
            <span>
              Network <b>{action.network}</b>
            </span>
            <span>
              Target <b>{action.target}</b>
            </span>
            <span>
              Method <b>{action.method}</b>
            </span>
            <span>
              Amount <b>{action.amountCSPR} CSPR</b>
            </span>
          </div>
        </article>

        <article className="panel">
          <h2>2. Policy firewall</h2>
          <div className="policy">
            <div>
              <span>Network allowlist</span>
              <b>{defaultPolicy.allowedNetworks.join(', ')}</b>
            </div>
            <div>
              <span>Single spend cap</span>
              <b>{defaultPolicy.maxSingleSpendCSPR} CSPR</b>
            </div>
            <div>
              <span>Review threshold</span>
              <b>{defaultPolicy.reviewAboveRiskScore}</b>
            </div>
            <div>
              <span>Block threshold</span>
              <b>{defaultPolicy.blockAboveRiskScore}</b>
            </div>
          </div>

          <h3>Findings</h3>
          <ul className="findings">
            {decision?.findings.map((finding) => (
              <li key={finding.rule} className={finding.severity}>
                <b>{finding.rule}</b>
                <span>{finding.message}</span>
                <em>+{finding.score}</em>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid three">
        <article className="panel proof">
          <h2>3. Casper audit proof</h2>
          <p>
            Each evaluation produces deterministic hashes that can be anchored without
            exposing private prompt content.
          </p>
          <Hash label="Intent" value={decision?.intentHash} />
          <Hash label="Policy" value={decision?.policyHash} />
          <Hash label="Evidence" value={decision?.evidenceHash} />
          <Hash label="Decision" value={decision?.decisionHash} />
        </article>

        <article className="panel">
          <h2>4. Live Testnet anchor</h2>
          <pre>{`network: ${TESTNET_PROOF.network}
deploy: ${TESTNET_PROOF.deployHash}
account: ${TESTNET_PROOF.accountHash}`}</pre>
          <a
            className="proof-link"
            href={`https://testnet.cspr.live/deploy/${TESTNET_PROOF.deployHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View deploy proof
          </a>
        </article>

        <article className="panel">
          <h2>5. Recommendation</h2>
          <p className="recommendation">{decision?.recommendedAction}</p>
          <p className="muted">
            AgentShield is designed to become an MCP/x402 risk-check service for Casper
            agents that need policy decisions before signing high-value actions.
          </p>
        </article>
      </section>
    </main>
  )
}

function Hash({ label, value }: { label: string; value?: string }) {
  return (
    <div className="hash">
      <span>{label}</span>
      <code>{value ?? '...'}</code>
    </div>
  )
}

export default App