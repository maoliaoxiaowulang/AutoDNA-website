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

  <!-- Multi-Agent System -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">Multi-Agent System</span>
        <h2 class="section-title">Six Specialized AI Agents</h2>
        <p class="section-subtitle" style="margin:0 auto;">
          Each agent has a distinct role, communicating through natural language.
        </p>
      </div>
      <div v-observe style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.25rem;color:var(--color-primary);margin-bottom:1rem;">🧪 Chemical Planning Module</h3>
      </div>
      <div v-observe style="display:grid;gap:1rem;margin-bottom:3rem;">
        <div class="agent-card" v-for="agent in planningAgents" :key="agent.name">
          <div :class="['card__icon', agent.iconClass]" style="flex-shrink:0;">{{ agent.icon }}</div>
          <div>
            <div class="card__title">{{ agent.name }}</div>
            <div class="agent-card__abbr">{{ agent.abbr }}</div>
            <p class="card__text">{{ agent.desc }}</p>
          </div>
        </div>
      </div>
      <div v-observe style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.25rem;color:var(--color-accent);margin-bottom:1rem;">🔧 Hardware Execution Module</h3>
      </div>
      <div v-observe style="display:grid;gap:1rem;">
        <div class="agent-card" v-for="agent in hardwareAgents" :key="agent.name">
          <div :class="['card__icon', agent.iconClass]" style="flex-shrink:0;">{{ agent.icon }}</div>
          <div>
            <div class="card__title">{{ agent.name }}</div>
            <div class="agent-card__abbr">{{ agent.abbr }}</div>
            <p class="card__text">{{ agent.desc }}</p>
          </div>
        </div>
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

const flowSteps = ['Design Protocol', 'Generate Code', 'Execute on Hardware', 'Validate Results', 'Optimize & Repeat']

const techStack = [
  { name:'TypeScript', cls:'tag--blue' }, { name:'React', cls:'tag--blue' }, { name:'Next.js', cls:'tag--blue' },
  { name:'Python 3.11+', cls:'tag--purple' }, { name:'Google Gemini API', cls:'tag--purple' },
  { name:'C++17' }, { name:'CMake' }, { name:'C#' }, { name:'PLC' }, { name:'Modbus' },
  { name:'WebSocket' }, { name:'Docker' }, { name:'Apache 2.0', cls:'tag--green' },
]
</script>
