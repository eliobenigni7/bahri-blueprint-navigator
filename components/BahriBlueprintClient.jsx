'use client';

import { useMemo, useState } from 'react';
import BahriThreeScene from './BahriThreeScene';

const steps = [
  { id: 'bcm', label: 'BCM Hologram', cue: 'Vista macro della mappa di capability.' },
  { id: 'voyage', label: 'Voyage Timeline', cue: 'Sequenza narrativa e turning points.' },
  { id: 'asis', label: 'As-Is Architecture', cue: 'Stato corrente, criticità e dipendenze.' },
  { id: 'tobe', label: 'To-Be Operating Backbone', cue: 'Target operating model e flussi ideali.' },
  { id: 'finale', label: 'Improvement Finale', cue: 'Roadmap, quick wins e priorità.' },
];

const domains = [
  {
    id: 'oil',
    label: 'Oil',
    icon: '◈',
    routeColor: '#63e2ff',
    status: 'Healthy',
    maturity: 78,
    priority: 'High',
    opportunityDensity: 'High',
    executive: 'Strong foundation with high-impact opportunities to scale and lead.',
    detail: 'Petroleum route with solid maturity, visible leverage and multiple scale-up opportunities.',
    cue: 'Zoom into Oil to explore its voyage timeline and key turning points.',
    position: { left: '52%', top: '40%' },
  },
  {
    id: 'drybulk',
    label: 'Dry Bulk',
    icon: '▣',
    routeColor: '#f0b15f',
    status: 'Watch',
    maturity: 64,
    priority: 'High',
    opportunityDensity: 'Medium',
    executive: 'Healthy demand with room to tighten coordination and terminal responsiveness.',
    detail: 'Bulk shipping spine with moderate maturity and strong operational upside.',
    cue: 'Review terminal sync, scheduling friction and capacity discipline.',
    position: { left: '72%', top: '34%' },
  },
  {
    id: 'logistics',
    label: 'Integrated Logistics',
    icon: '⌬',
    routeColor: '#7d8fff',
    status: 'Healthy',
    maturity: 73,
    priority: 'High',
    opportunityDensity: 'High',
    executive: 'Connected network with strong leverage across ports, linehaul and orchestration.',
    detail: 'Integration layer bridging maritime moves and end-to-end logistics execution.',
    cue: 'Inspect orchestration, asset visibility and service-level continuity.',
    position: { left: '26%', top: '54%' },
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: '▤',
    routeColor: '#6ec7ff',
    status: 'Healthy',
    maturity: 81,
    priority: 'Medium',
    opportunityDensity: 'Medium',
    executive: 'Stable control environment with good signal for operational steering.',
    detail: 'Backbone of economic governance, cost tracking and decision support.',
    cue: 'Open the finance layer to inspect cost discipline and trend stability.',
    position: { left: '14%', top: '32%' },
  },
  {
    id: 'hr',
    label: 'HR',
    icon: '◫',
    routeColor: '#f6c06e',
    status: 'Watch',
    maturity: 58,
    priority: 'High',
    opportunityDensity: 'High',
    executive: 'Capability health is good, but there is a clear need for consistency and scale.',
    detail: 'People layer, capability development and workforce resilience.',
    cue: 'Evaluate talent depth, workforce readiness and capability gaps.',
    position: { left: '38%', top: '74%' },
  },
  {
    id: 'support',
    label: 'Corporate Support',
    icon: '⬡',
    routeColor: '#bc7cff',
    status: 'Watch',
    maturity: 52,
    priority: 'Medium',
    opportunityDensity: 'High',
    executive: 'Support layer needs sharper alignment with operating priorities.',
    detail: 'Shared services, governance and cross-functional enablement.',
    cue: 'Look at governance friction, service clarity and decision latency.',
    position: { left: '18%', top: '76%' },
  },
  {
    id: 'shipmgmt',
    label: 'Ship Management',
    icon: '✦',
    routeColor: '#ff6a5c',
    status: 'Critical',
    maturity: 41,
    priority: 'High',
    opportunityDensity: 'Very High',
    executive: 'This route needs immediate focus to reduce risk and stabilize execution.',
    detail: 'Operational control of fleet condition, maintenance and readiness.',
    cue: 'Escalate on maintenance gaps, exceptions and operational assurance.',
    position: { left: '82%', top: '68%' },
  },
  {
    id: 'marine',
    label: 'Marine',
    icon: '⚓',
    routeColor: '#45d8d1',
    status: 'Healthy',
    maturity: 86,
    priority: 'Medium',
    opportunityDensity: 'Low',
    executive: 'One of the strongest routes; an anchor for stable execution.',
    detail: 'Marine operations, navigation discipline and vessel-side execution.',
    cue: 'Use this route as a reference model for operational excellence.',
    position: { left: '82%', top: '24%' },
  },
];

const guidance = [
  {
    title: 'What you’re seeing',
    body: 'This is your Business Capability Map — a living hologram of Bahri’s operating ecosystem. Each route represents a Business Unit and its flow of value.',
  },
  {
    title: 'How to read it',
    body: 'The glowing routes show the health and maturity of each BU. Select a node to explore insights, risks and opportunities.',
  },
  {
    title: 'Why it matters',
    body: 'It gives a shared view of where we are strong, where we are at risk, and where to focus next for maximum impact.',
  },
  {
    title: 'Next cue',
    body: 'We’ll now zoom into the selected domain to explore its voyage timeline and key turning points.',
  },
];

function statusTone(status) {
  if (status === 'Critical') return 'danger';
  if (status === 'Watch') return 'warning';
  return 'stable';
}

export default function BahriBlueprintClient() {
  const [selectedId, setSelectedId] = useState('oil');
  const [stepIndex, setStepIndex] = useState(0);

  const selected = useMemo(() => domains.find((item) => item.id === selectedId) ?? domains[0], [selectedId]);
  const currentStep = steps[stepIndex];

  return (
    <div className="app-shell">
      <div className="frame">
        <header className="topbar">
          <div className="brand-block">
            <div className="brand-kicker">Bahri</div>
            <div className="brand-title">Blueprint</div>
            <div className="brand-subtitle">Cinematic Operating Journey</div>
          </div>

          <nav className="stepper" aria-label="Blueprint stages">
            {steps.map((step, index) => {
              const active = index === stepIndex;
              return (
                <button
                  key={step.id}
                  className={`step-chip ${active ? 'active' : ''}`}
                  onClick={() => setStepIndex(index)}
                  type="button"
                >
                  <span className="step-index">{index + 1}</span>
                  <span className="step-label">{step.label}</span>
                </button>
              );
            })}
          </nav>
        </header>

        <div className="hero-copy">
          <div className="hero-title">{currentStep.label}</div>
          <div className="hero-subtitle">{currentStep.cue}</div>
        </div>

        <BahriThreeScene domains={domains} selectedId={selectedId} onSelect={setSelectedId} />

        <section className="panel left-panel">
          <div className="panel-kicker">{selected.label}</div>
          <div className="panel-title-row">
            <h2>{selected.label}</h2>
            <span className={`status-badge ${statusTone(selected.status)}`}>{selected.status}</span>
          </div>

          <div className="metric-grid">
            <div className="metric-card">
              <span>Maturity Score</span>
              <strong>{selected.maturity}/100</strong>
            </div>
            <div className="metric-card">
              <span>Strategic Priority</span>
              <strong>{selected.priority}</strong>
            </div>
            <div className="metric-card">
              <span>Opportunity Density</span>
              <strong>{selected.opportunityDensity}</strong>
            </div>
            <div className="metric-card accent">
              <span>Route Cue</span>
              <strong>{selected.routeColor}</strong>
            </div>
          </div>

          <p className="panel-copy">{selected.executive}</p>
          <div className="insight-card">
            <div className="insight-label">Executive interpretation</div>
            <p>{selected.detail}</p>
          </div>
          <div className="footer-note">{selected.cue}</div>
        </section>

        <aside className="panel right-rail">
          <div className="rail-title">Guidance Rail</div>
          {guidance.map((item) => (
            <div className="rail-card" key={item.title}>
              <div className="rail-card-title">{item.title}</div>
              <p>{item.body}</p>
            </div>
          ))}
          <div className="rail-footer">
            <span>Current step</span>
            <strong>{currentStep.label}</strong>
          </div>
        </aside>

        <section className="scene-labels" aria-hidden="true">
          {domains.map((domain) => (
            <button
              key={domain.id}
              className={`scene-label ${selectedId === domain.id ? 'selected' : ''}`}
              style={{ left: domain.position.left, top: domain.position.top, borderColor: domain.routeColor }}
              onClick={() => setSelectedId(domain.id)}
              type="button"
            >
              <span className="label-icon" style={{ color: domain.routeColor }}>
                {domain.icon}
              </span>
              <span className="label-text">{domain.label}</span>
            </button>
          ))}
        </section>

        <footer className="bottom-left">
          <div className="legend-card">
            <div className="legend-title">Route Health Legend</div>
            <div className="legend-row"><span className="dot stable" />Stable <em>On track</em></div>
            <div className="legend-row"><span className="dot watch" />Watch <em>Monitor</em></div>
            <div className="legend-row"><span className="dot critical" />Critical <em>Act now</em></div>
          </div>
          <div className="network-card">
            <div className="legend-title">Network Status</div>
            <div className="network-state">Stable</div>
            <div className="network-sub">All critical paths active</div>
          </div>
        </footer>

        <div className="bottom-right-pill">Click a node to inspect the blueprint</div>
      </div>
    </div>
  );
}
