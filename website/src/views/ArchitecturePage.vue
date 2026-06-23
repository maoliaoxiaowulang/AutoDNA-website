<template>
  <header class="page-header">
    <div class="container container--narrow">
      <span class="section-label">System Design</span>
      <h1>Architecture</h1>
      <p class="section-subtitle" style="margin:0 auto;">
        A four-layer, multi-agent architecture where AI models and laboratory hardware are co-designed from the ground up.
      </p>
    </div>
  </header>

  <!-- Four-Layer Diagram -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">Layered Architecture</span>
        <h2 class="section-title">From User Interface to Physical Hardware</h2>
      </div>
      <div v-observe>
        <div v-for="(layer, i) in layers" :key="i">
          <div class="arch-layer" :style="{borderColor: layer.color, background: layer.bg}">
            <div style="font-weight:600;font-size:1.125rem;">{{ layer.icon }} {{ layer.name }}</div>
            <div class="tag tag--blue" style="margin-top:0.5rem;" v-if="layer.tech">{{ layer.tech }}</div>
            <p style="font-size:0.875rem;color:var(--color-text-secondary);margin-top:0.5rem;">{{ layer.desc }}</p>
          </div>
          <div class="arch-arrow" v-if="i < layers.length - 1"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Agent Architecture Diagram -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">Agent Architecture</span>
        <h2 class="section-title">AI-Native Closed-Loop Laboratory</h2>
        <p class="section-subtitle" style="margin:0 auto;">
          Six specialized LLM agents coordinate chemical planning, hardware execution,
          validation feedback, and optimization.
        </p>
      </div>

      <div v-observe class="agent-diagram-shell">
        <div
          class="agent-diagram"
          role="img"
          aria-label="AutoDNA agent architecture with chemical planning and hardware execution modules connected in a closed autonomous loop."
        >
          <svg class="agent-diagram__svg" viewBox="0 0 1710 858" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="arrow-gray" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" refX="20" refY="12" orient="auto-start-reverse">
                <path d="M 0 0 L 24 12 L 0 24 z" fill="#8A8D91" />
              </marker>
              <marker id="arrow-wide-gray" markerUnits="userSpaceOnUse" markerWidth="60" markerHeight="60" refX="54" refY="30" orient="auto">
                <path d="M 0 0 L 60 30 L 0 60 z" fill="#D1D3D4" />
              </marker>
              <marker id="arrow-purple" markerUnits="userSpaceOnUse" markerWidth="72" markerHeight="72" refX="60" refY="36" orient="auto">
                <path d="M 0 0 L 72 36 L 0 72 z" fill="#9C1C9F" />
              </marker>
              <marker id="arrow-blue" markerUnits="userSpaceOnUse" markerWidth="60" markerHeight="60" refX="50" refY="30" orient="auto">
                <path d="M 0 0 L 60 30 L 0 60 z" fill="#2696BD" />
              </marker>
            </defs>

            <path class="loop-line loop-line--purple" d="M 300 492 V 66 H 1328 V 492" marker-end="url(#arrow-purple)" />
            <path class="loop-line loop-line--blue" d="M 1328 548 V 812 H 300 V 492" marker-end="url(#arrow-blue)" />

            <path class="requirement-arrow" d="M 100 194 H 134 V 286 H 234 V 258 L 286 306 L 234 354 V 326 H 100 Z" />
            <path class="flow-line" d="M 552 252 L 665 310" marker-start="url(#arrow-gray)" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 958 360 L 1072 278" marker-start="url(#arrow-gray)" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 814 230 V 202" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 814 270 V 310" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 900 466 L 1068 635" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 1070 666 H 556" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 520 588 L 650 478" marker-end="url(#arrow-gray)" />
            <path class="flow-line flow-line--dash" d="M 207 610 L 262 636" />
            <path class="flow-line flow-line--dash" d="M 1364 640 L 1404 626" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 1218 834 V 744" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 342 826 V 744" marker-end="url(#arrow-gray)" />
            <path class="flow-line" d="M 496 744 V 826" marker-end="url(#arrow-gray)" />
          </svg>

          <div class="diagram-divider"></div>
          <div class="module-label module-label--chemical">Chemical Planning</div>
          <div class="module-label module-label--hardware">Hardware Execution</div>

          <div class="diagram-node diagram-node--requirement">
            <div class="diagram-node__icon">🧑‍🔬</div>
            <div>Natural Language Requirement</div>
          </div>

          <div class="side-panel side-panel--scheduler">
            <h3>Hardware Scheduler</h3>
            <div class="scheduler-grid">
              <div class="tube-row">
                <span></span><span></span><span class="tube-row__red"></span><span class="tube-row__red"></span>
              </div>
              <div class="scheduler-arrow">↓</div>
              <div class="tube-row tube-row--split">
                <span></span><span class="tube-row__red"></span><span></span><span class="tube-row__red"></span>
              </div>
            </div>
            <p>Instructions</p>
            <p>Runtime Scheduling</p>
          </div>

          <article
            v-for="agent in diagramAgents"
            :key="agent.abbr"
            :class="['diagram-agent', `diagram-agent--${agent.abbr.toLowerCase()}`]"
          >
            <div class="diagram-agent__icon">{{ agent.icon }}</div>
            <h3>{{ agent.name }}</h3>
            <span>{{ agent.abbr }}</span>
          </article>

          <div class="transfer-label transfer-label--literature">Literature Searching</div>
          <div class="transfer-label transfer-label--reagent">Reagent Information</div>
          <div class="transfer-label transfer-label--optimization">Optimization Directions</div>
          <div class="transfer-label transfer-label--feedback">Validated Experimental Feedback</div>
          <div class="transfer-label transfer-label--process">Process 1<br>Process...</div>
          <div class="transfer-label transfer-label--program">Program 1<br>Program...</div>
          <div class="transfer-label transfer-label--raw">Raw data</div>
          <div class="transfer-label transfer-label--instructions">Instructions</div>
          <div class="transfer-label transfer-label--documents">Documents</div>

          <div class="side-panel side-panel--abstraction">
            <h3>Hardware Abstraction</h3>
            <div class="instrument-icon">🌡️</div>
            <strong>Thermal Cycler</strong>
            <div class="service-list">
              <span>set_temp</span>
              <span>start</span>
            </div>
            <p>Object-oriented Descriptions</p>
          </div>

        </div>
      </div>

      <div v-observe class="agent-summary-grid">
        <article class="agent-module-card">
          <h3>Chemical Planning Module</h3>
          <div class="agent-mini-list">
            <div v-for="agent in planningAgents" :key="agent.name" class="agent-mini">
              <strong>{{ agent.abbr }}</strong>
              <span>{{ agent.desc }}</span>
            </div>
          </div>
        </article>
        <article class="agent-module-card agent-module-card--hardware">
          <h3>Hardware Execution Module</h3>
          <div class="agent-mini-list">
            <div v-for="agent in hardwareAgents" :key="agent.name" class="agent-mini">
              <strong>{{ agent.abbr }}</strong>
              <span>{{ agent.desc }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Closed-Loop Flow -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">Workflow</span>
        <h2 class="section-title">Closed-Loop Autonomous Cycle</h2>
      </div>
      <div v-observe class="flow-steps">
        <template v-for="(step, i) in flowSteps" :key="i">
          <div class="flow-step" :style="i === flowSteps.length - 1 ? {borderColor:'var(--color-primary)',background:'rgba(66,133,244,0.04)'} : {}">
            <span class="flow-step-num">{{ i + 1 }}</span> {{ step }}
          </div>
          <span class="flow-arrow" v-if="i < flowSteps.length - 1">→</span>
        </template>
      </div>
      <div v-observe style="text-align:center;margin-top:2rem;">
        <p class="section-subtitle" style="margin:0 auto;">
          The entire design–experiment–optimize loop runs without human intervention.
          When results underperform, the Hypothesis Proposer Agent generates improvement
          hypotheses, triggering iterative refinement.
        </p>
      </div>
    </div>
  </section>

  <!-- Tech Stack -->
  <section class="section section--alt">
    <div class="container" style="text-align:center;">
      <div v-observe style="margin-bottom:2rem;">
        <span class="section-label">Technology Stack</span>
        <h2 class="section-title">Built with Modern Tools</h2>
      </div>
      <div v-observe>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;margin-bottom:1.5rem;">
          <span v-for="t in techStack" :key="t.name" class="tag" :class="t.cls">{{ t.name }}</span>
        </div>
      </div>
      <div v-observe>
        <a href="https://github.com/IPADS-X/AutoDNA" class="btn btn--secondary" target="_blank" rel="noopener">View Source on GitHub ↗</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const layers = [
  { icon:'🎨', name:'UI Layer', tech:'React · Next.js · LobeChat · WebSocket', desc:'Web-based interface for natural language experiment specification and real-time monitoring.', color:'var(--color-primary)', bg:'rgba(66,133,244,0.03)' },
  { icon:'🧠', name:'AI Engine — AutoDNA-python', tech:'Python 3.11+ · Google Gemini API · Multi-Agent LLM', desc:'Six specialized agents collaboratively design protocols and optimize experiments.', color:'var(--color-accent)', bg:'rgba(124,77,255,0.03)' },
  { icon:'⚙️', name:'Scheduler Layer', tech:'C++17 · CMake · Modbus · WebSocket', desc:'Real-time hardware coordination, reagent allocation, and concurrent multi-user scheduling.' },
  { icon:'🔩', name:'Firmware Layer', tech:'C# · PLC · Robotics · Instrument Drivers', desc:'Low-level control of pipettes, robotic arms, thermal cyclers, fluorometers, and more.' },
]

const planningAgents = [
  { icon:'📋', iconClass:'card__icon--blue', name:'Experiment Planner Agent', abbr:'EPA', desc:'Designs experimental procedures and orchestrates optimization by integrating insights from all agents.' },
  { icon:'💡', iconClass:'card__icon--purple', name:'Hypothesis Proposer Agent', abbr:'HPA', desc:'Generates optimization hypotheses by analyzing experimental results and identifying causal factors.' },
  { icon:'📚', iconClass:'card__icon--green', name:'Literature Researcher Agent', abbr:'LRA', desc:'Retrieves and analyzes scientific literature to inform protocol design and optimal conditions.' },
  { icon:'🧴', iconClass:'card__icon--amber', name:'Reagent Manager Agent', abbr:'RMA', desc:'Manages reagent inventory and enforces resource constraints during procedure generation.' },
]

const hardwareAgents = [
  { icon:'💻', iconClass:'card__icon--purple', name:'Program Developer Agent', abbr:'PDA', desc:'Transforms instrument functionalities into AI-native "atomic services" and generates executable Python code with autonomous validation.' },
  { icon:'✅', iconClass:'card__icon--green', name:'Hardware Executor & Validator Agent', abbr:'HEVA', desc:'Deploys code, executes experiments, validates results, and maintains real-time instrument status for dynamic scheduling.' },
]

const diagramAgents = [
  { icon:'📚', name:'Literature Researcher Agent', abbr:'LRA' },
  { icon:'🧪', name:'Reagent Manager Agent', abbr:'RMA' },
  { icon:'💡', name:'Hypothesis Proposer Agent', abbr:'HPA' },
  { icon:'📋', name:'Experiment Planner Agent', abbr:'EPA' },
  { icon:'⚙️', name:'Hardware Executor & Validator Agent', abbr:'HEVA' },
  { icon:'💻', name:'Program Developer Agent', abbr:'PDA' },
]

const flowSteps = ['Design Protocol', 'Generate Code', 'Execute on Hardware', 'Validate Results', 'Optimize & Repeat']

const techStack = [
  { name:'TypeScript', cls:'tag--blue' }, { name:'React', cls:'tag--blue' }, { name:'Next.js', cls:'tag--blue' },
  { name:'Python 3.11+', cls:'tag--purple' }, { name:'Google Gemini API', cls:'tag--purple' },
  { name:'C++17' }, { name:'CMake' }, { name:'C#' }, { name:'PLC' }, { name:'Modbus' },
  { name:'WebSocket' }, { name:'Docker' }, { name:'Apache 2.0', cls:'tag--green' },
]
</script>

<style scoped>
.agent-diagram-shell {
  overflow-x: auto;
  margin-left: -2rem;
  margin-right: -2rem;
  padding: 0.5rem 1rem 1rem;
  scrollbar-color: rgba(66,133,244,0.35) transparent;
}

.agent-diagram {
  position: relative;
  width: 1710px;
  min-width: 1710px;
  height: 858px;
  margin: 0 auto;
  zoom: 0.59;
  background: #fff;
  border: 1px solid rgba(26,26,46,0.08);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.agent-diagram__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.loop-line,
.flow-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.loop-line {
  stroke-width: 18;
}

.loop-line--purple { stroke: #9C1C9F; }
.loop-line--blue { stroke: #2696BD; }

.flow-line {
  stroke: #8A8D91;
  stroke-width: 4;
}

.flow-line--wide {
  stroke: #D1D3D4;
  stroke-width: 26;
  stroke-linecap: butt;
}

.flow-line--requirement {
  stroke: #D1D3D4;
  stroke-width: 32;
  stroke-linecap: butt;
}

.requirement-arrow {
  fill: #D1D3D4;
}

.flow-line--dash {
  stroke-dasharray: 8 10;
}

.diagram-divider {
  position: absolute;
  left: 285px;
  right: 375px;
  top: 492px;
  border-top: 3px dashed #1A1A2E;
}

.module-label {
  position: absolute;
  left: 342px;
  z-index: 2;
  font-size: 1.65rem;
  font-weight: 700;
  background: #fff;
  padding: 0 0.75rem;
  line-height: 1.2;
}

.module-label--chemical {
  top: 455px;
  color: #9C1C9F;
}

.module-label--hardware {
  top: 507px;
  color: #248DB3;
}

.diagram-node,
.diagram-agent,
.side-panel,
.transfer-label {
  position: absolute;
  z-index: 3;
}

.diagram-node,
.diagram-agent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #FFF5E6;
  border: 2px solid rgba(26,26,46,0.88);
  border-radius: 18px;
  padding: 1rem;
  color: #050505;
  line-height: 1.15;
  box-shadow: 0 6px 18px rgba(26,26,46,0.04);
}

.diagram-node {
  width: 224px;
  min-height: 126px;
  border-radius: 0;
  background: #fff;
  font-size: 1.75rem;
  font-weight: 600;
}

.diagram-node__icon,
.diagram-agent__icon {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 0.65rem;
}

.diagram-agent {
  width: 294px;
  min-height: 156px;
}

.diagram-agent h3 {
  margin: 0;
  font-size: 1.65rem;
  letter-spacing: 0;
}

.diagram-agent span {
  margin-top: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.diagram-node--requirement { left: 20px; top: 68px; }
.diagram-agent--lra { left: 258px; top: 120px; }
.diagram-agent--rma { left: 666px; top: 34px; }
.diagram-agent--hpa { left: 1072px; top: 120px; }
.diagram-agent--epa { left: 666px; top: 310px; }
.diagram-agent--heva { left: 262px; top: 588px; }
.diagram-agent--pda { left: 1072px; top: 588px; }

.side-panel {
  background: #F8F9FA;
  border: 2px solid #8A8D91;
  border-radius: var(--radius-sm);
  color: #050505;
  text-align: center;
  box-shadow: 0 6px 16px rgba(26,26,46,0.04);
}

.side-panel h3 {
  margin: 0 0 1rem;
  font-size: 1.65rem;
  letter-spacing: 0;
}

.side-panel p {
  margin: 0.45rem 0 0;
  color: #050505;
  font-size: 1.2rem;
  line-height: 1.2;
}

.side-panel--scheduler {
  left: 20px;
  top: 330px;
  width: 187px;
  height: 506px;
  padding: 1.25rem 0.75rem;
}

.scheduler-grid {
  display: grid;
  gap: 0.8rem;
  margin: 1rem 0;
}

.tube-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.45rem;
  border: 1px solid #B5B7BA;
  padding: 0.9rem 0.6rem;
  background: #fff;
}

.tube-row span {
  height: 72px;
  border: 3px solid #184CFF;
  border-top-color: #555;
  border-radius: 2px 2px 10px 10px;
}

.tube-row .tube-row__red {
  border-color: #F31D1D;
  border-top-color: #555;
}

.scheduler-arrow {
  font-size: 2rem;
  line-height: 1;
  color: #8A8D91;
}

.side-panel--abstraction {
  left: 1404px;
  top: 390px;
  width: 194px;
  min-height: 402px;
  padding: 1.2rem 0.7rem;
}

.instrument-icon {
  display: grid;
  place-items: center;
  width: 152px;
  height: 140px;
  margin: 0 auto 0.75rem;
  border: 1px solid #8A8D91;
  background: #fff;
  font-size: 3.2rem;
}

.side-panel--abstraction strong {
  display: block;
  font-size: 1.35rem;
  line-height: 1.2;
  margin-bottom: 0.65rem;
}

.service-list {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.45rem;
}

.service-list span {
  display: block;
  background: #fff;
  border: 1px solid #8A8D91;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem;
}

.transfer-label {
  min-width: 104px;
  padding: 0.35rem 0.8rem;
  background: #fff;
  border: 2px solid #8A8D91;
  color: #050505;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.18;
  text-align: center;
}

.transfer-label--literature { left: 495px; top: 285px; width: 124px; }
.transfer-label--reagent { left: 690px; top: 230px; width: 246px; }
.transfer-label--optimization { left: 988px; top: 348px; width: 164px; }
.transfer-label--feedback { left: 560px; top: 536px; width: 280px; }
.transfer-label--process { left: 876px; top: 536px; width: 158px; }
.transfer-label--program { left: 752px; top: 634px; width: 146px; }
.transfer-label--raw { left: 274px; top: 826px; width: 138px; }
.transfer-label--instructions { left: 418px; top: 826px; width: 158px; }
.transfer-label--documents { left: 1140px; top: 826px; width: 154px; }

.agent-summary-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
}

.agent-module-card {
  border: 1px solid rgba(156,28,159,0.25);
  border-top: 4px solid #9C1C9F;
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  background: #fff;
}

.agent-module-card--hardware {
  border-color: rgba(38,150,189,0.25);
  border-top-color: #2696BD;
}

.agent-module-card h3 {
  margin: 0 0 1rem;
  font-size: 1.15rem;
  letter-spacing: 0;
}

.agent-mini-list {
  display: grid;
  gap: 0.85rem;
}

.agent-mini {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: 0.95rem;
  line-height: 1.55;
}

.agent-mini strong {
  font-family: var(--font-mono);
  color: var(--color-primary);
}

.agent-mini span {
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .agent-diagram {
    zoom: 0.52;
  }

  .agent-summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1500px) {
  .agent-diagram {
    zoom: 0.72;
  }
}

@media (max-width: 768px) {
  .agent-diagram-shell {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .agent-diagram {
    zoom: 0.45;
    transform-origin: top left;
  }
}
</style>
