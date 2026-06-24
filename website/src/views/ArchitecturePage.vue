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
  <section class="section">
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

  <!-- Atomic Services -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">Core Concept</span>
        <h2 class="section-title">AI-Native Atomic Services</h2>
        <p class="section-subtitle" style="margin:0 auto;">
          The foundational abstraction that enables AI agents to understand and reason about instrument capabilities.
        </p>
      </div>
      
      <!-- Definition & Philosophy -->
      <div v-observe class="card" style="border-top:3px solid var(--color-primary);margin-bottom:2rem;">
        <h3 style="font-size:1.25rem;margin-bottom:1rem;">🔬 What are Atomic Services?</h3>
        <p class="card__text" style="font-size:1.125rem;line-height:1.8;">
          Atomic Services are the fundamental building blocks of AutoDNA's hardware abstraction layer. 
          Each atomic service represents a <strong>minimal, self-contained hardware operation</strong> 
          that can be combined to form complex experimental workflows. Unlike traditional instrument 
          control APIs, atomic services are designed from the ground up to be <strong>AI-understandable</strong>, 
          enabling LLM agents to reason about hardware capabilities, compose operations, and generate 
          executable code autonomously.
        </p>
      </div>

      <!-- Design Principles -->
      <div v-observe style="margin-bottom:2rem;">
        <h3 style="font-size:1.25rem;color:var(--color-accent);margin-bottom:1.5rem;">🎯 Core Design Principles</h3>
        <div class="grid-3" style="gap:1.5rem;">
          <div class="card">
            <div class="card__icon card__icon--blue">🧩</div>
            <h4 class="card__title">Composability</h4>
            <p class="card__text">Services can be arbitrarily combined to construct complex protocols without human intervention.</p>
          </div>
          <div class="card">
            <div class="card__icon card__icon--purple">🔍</div>
            <h4 class="card__title">Self-Describing</h4>
            <p class="card__text">Each service includes natural language descriptions and parameter constraints for AI comprehension.</p>
          </div>
          <div class="card">
            <div class="card__icon card__icon--green">⚡</div>
            <h4 class="card__title">Atomicity</h4>
            <p class="card__text">Services represent minimal operations that succeed or fail as a single unit.</p>
          </div>
        </div>
      </div>

      <!-- Instrument Abstractions -->
      <div v-observe>
        <h3 style="font-size:1.25rem;color:var(--color-success);margin-bottom:0.75rem;">📦 Instrument Abstractions</h3>
        <p class="card__text" style="margin-bottom:1rem;max-width:52rem;">
          Defined in <code style="font-family:var(--font-mono);font-size:0.875rem;">lab_modules.py</code>, each instrument is exposed as a Python class with self-describing methods.
          Implemented methods dispatch a single scheduler command via <code style="font-family:var(--font-mono);font-size:0.875rem;">call_machine_command()</code>; API stubs are declared for AI comprehension but not yet linked to hardware.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem;">
          <span class="tag tag--green">Implemented — linked to scheduler</span>
          <span class="tag">API stub — not yet linked</span>
        </div>
        <div class="instrument-masonry" v-stagger>
          <div class="card instrument-masonry__item" v-for="device in instrumentAbstractions" :key="device.className">
            <div style="font-weight:600;font-size:1.125rem;margin-bottom:0.375rem;">{{ device.icon }} {{ device.name }}</div>
            <div class="tag tag--blue" style="margin-bottom:0.75rem;">{{ device.className }}</div>
            <p class="card__text" style="font-size:0.9375rem;">{{ device.desc }}</p>
            <div style="margin-top:1rem;">
              <div style="font-size:0.875rem;color:var(--color-text-light);margin-bottom:0.625rem;">Atomic operations:</div>
              <div style="display:flex;flex-direction:column;gap:0.625rem;">
                <div
                  v-for="op in device.operations"
                  :key="op.method"
                  :style="{
                    padding:'0.625rem 0.75rem',
                    borderRadius:'0.375rem',
                    background: op.implemented ? 'rgba(52,168,83,0.04)' : 'rgba(0,0,0,0.02)',
                    borderLeft: op.implemented ? '3px solid var(--color-success)' : '3px solid var(--color-text-light)',
                  }"
                >
                  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.375rem 0.5rem;margin-bottom:0.375rem;">
                    <code style="font-family:var(--font-mono);font-size:0.8125rem;color:var(--color-primary);">{{ op.method }}</code>
                    <span :class="['tag', op.implemented ? 'tag--green' : '']" style="font-size:0.75rem;">{{ op.implemented ? 'Implemented' : 'API stub' }}</span>
                  </div>
                  <p style="font-size:0.8125rem;color:var(--color-text-secondary);line-height:1.55;margin:0;">{{ op.desc }}</p>
                  <div v-if="op.command" style="margin-top:0.375rem;display:flex;flex-wrap:wrap;align-items:baseline;gap:0.375rem;">
                    <span style="font-size:0.75rem;color:var(--color-text-light);">Scheduler:</span>
                    <code style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-accent);">{{ op.command }}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Abstraction to Implementation -->
      <div v-observe style="margin-top:3rem;">
        <h3 style="font-size:1.25rem;color:var(--color-warning);margin-bottom:0.75rem;">🔄 From Abstraction to Implementation</h3>
        <p class="card__text" style="margin-bottom:1.5rem;max-width:52rem;">
          Each atomic service travels through five layers — from an AI-readable Python method down to a physical instrument action.
        </p>
        <div class="service-pipeline" v-pipeline-animate>
          <template v-for="(step, i) in serviceLifecycle" :key="i">
            <div class="service-pipeline__step" :class="`service-pipeline__step--${i + 1}`">
              <div class="service-pipeline__header">
                <span class="service-pipeline__num">{{ i + 1 }}</span>
                <span class="service-pipeline__layer">{{ step.layer }}</span>
              </div>
              <div class="service-pipeline__title">{{ step.title }}</div>
              <p class="service-pipeline__detail">{{ step.detail }}</p>
              <code class="service-pipeline__code">{{ step.example }}</code>
              <div class="service-pipeline__pulse" aria-hidden="true"></div>
            </div>
            <div v-if="i < serviceLifecycle.length - 1" class="service-pipeline__connector" aria-hidden="true">
              <div class="service-pipeline__connector-track">
                <span class="service-pipeline__connector-dot"></span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </template>
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

const diagramAgents = [
  { icon:'📚', name:'Literature Researcher Agent', abbr:'LRA' },
  { icon:'🧪', name:'Reagent Manager Agent', abbr:'RMA' },
  { icon:'💡', name:'Hypothesis Proposer Agent', abbr:'HPA' },
  { icon:'📋', name:'Experiment Planner Agent', abbr:'EPA' },
  { icon:'⚙️', name:'Hardware Executor & Validator Agent', abbr:'HEVA' },
  { icon:'💻', name:'Program Developer Agent', abbr:'PDA' },
]

const flowSteps = ['Design Protocol', 'Generate Code', 'Execute on Hardware', 'Validate Results', 'Optimize & Repeat']

const instrumentAbstractions = [
  {
    icon: '⏱️', name: 'Timer', className: 'Timer',
    desc: 'A non-physical machine for pausing protocol execution.',
    operations: [
      { method: 'wait(time)', desc: 'Blocks execution for the specified number of seconds.', command: 'timer_wait', implemented: true },
    ],
  },
  {
    icon: '🧫', name: 'Container Manager', className: 'ContainerManager',
    desc: 'Manages allocation and retrieval of lab containers (tubes, plates).',
    operations: [
      { method: 'newContainer(label, cap)', desc: 'Allocates a new empty container with the given label and capacity.', command: 'container_allocate', implemented: true },
      { method: 'getContainerForReplenish(name, required_volume)', desc: 'Retrieves a replenishable container from the reagent repository or reuses an existing one.', command: 'container_get', implemented: true },
    ],
  },
  {
    icon: '🔒', name: 'Capper (200 µL tubes)', className: 'Capper_200ul_tubes',
    desc: 'Automatic capper for 8-strip 200 µL PCR tubes.',
    operations: [
      { method: 'cap()', desc: 'Executes a single, complete capping cycle for a pre-loaded 8-tube strip; blocks until finished.', command: 'capper_cap_container', implemented: true },
    ],
  },
  {
    icon: '🌀', name: 'Centrifuge (1.5 mL)', className: 'Centrifuge1p5mL',
    desc: 'Microcentrifuge designed for standard 1.5 mL tubes.',
    operations: [
      { method: 'run(speed_rpm, duration_seconds)', desc: 'Sets speed and duration, starts centrifugation, and blocks until the run completes.', command: 'centrifuge_start', implemented: true },
    ],
  },
  {
    icon: '🌀', name: 'Centrifuge (200 µL 8-strip)', className: 'Centrifuge_200ulTubes',
    desc: 'Microcentrifuge for standard 200 µL 8-strip tubes.',
    operations: [
      { method: 'run(speed_rpm, duration_sec)', desc: 'Starts a centrifugation cycle (default 2500 RPM, 15 s quick spin) and blocks until complete.', command: 'centrifuge_start', implemented: true },
    ],
  },
  {
    icon: '💡', name: 'Fluorometer (200 µL)', className: 'Fluorometer200ul',
    desc: 'Fluorometer for up to eight concurrent 200 µL tubes with two-point calibration support.',
    operations: [
      { method: 'calibrate(standard1_concentration, standard2_concentration, unit)', desc: 'Performs two-point calibration for concentration measurements using two known standards.', implemented: false },
      { method: 'measure_concentration(sample_volume_ul)', desc: 'Measures sample concentration in all eight wells; requires prior calibration.', command: 'fluorometer_concentration', implemented: true },
      { method: 'measure_fluorescence()', desc: 'Reads raw Relative Fluorescence Units (RFU) from all eight wells without calibration.', command: 'fluorometer_measure', implemented: true },
    ],
  },
  {
    icon: '🌡️', name: 'Heater (1.5 mL)', className: 'Heater1_5mlTubes',
    desc: 'Heating incubator for 1.5 mL sample tubes (Model TH-1500).',
    operations: [
      { method: 'start(temperature_celsius, duration_minutes)', desc: 'Starts heating to the target temperature; runs for a set duration or indefinitely if duration is None.', command: 'heater_start', implemented: true },
      { method: 'stop()', desc: 'Immediately stops active heating or timed incubation; the block begins passive cooling.', implemented: false },
      { method: 'get_current_temperature()', desc: 'Returns the current heating block temperature in degrees Celsius.', implemented: false },
    ],
  },
  {
    icon: '🔥', name: 'Heater-Shaker (200 µL)', className: 'HeaterShaker200uL',
    desc: 'Combined heated shaker for 200 µL tubes.',
    operations: [
      { method: 'incubate(target_temperature_celsius, target_speed_rpm, duration_seconds)', desc: 'Starts a heating and/or shaking protocol for a specified duration or until stopped.', command: 'heatershaker_start', implemented: true },
      { method: 'stop()', desc: 'Safely stops all heating and shaking; initiates shaker deceleration.', implemented: false },
      { method: 'get_current_temperature_celsius()', desc: 'Returns the current heating block temperature in Celsius.', implemented: false },
      { method: 'get_current_speed_rpm()', desc: 'Returns the current shaking speed in revolutions per minute.', implemented: false },
    ],
  },
  {
    icon: '🧲', name: 'Magnetic Rack (1.5 mL)', className: 'MagRackP1500',
    desc: 'Passive magnetic rack (MS-08) for 1.5 mL tubes; magnetic field is always active.',
    operations: [
      { method: 'separate(wait_duration_seconds)', desc: 'Waits for paramagnetic beads to pellet against the tube wall inside the magnetic field.', command: 'magrack_wait', implemented: true },
    ],
  },
  {
    icon: '🧲', name: 'Magnetic Rack (200 µL)', className: 'MagRackP200',
    desc: 'Passive magnetic rack (MS-08) for 200 µL PCR tubes.',
    operations: [
      { method: 'separate(duration_seconds)', desc: 'Waits for magnetic beads to fully separate and form a tight pellet (default 60 s).', command: 'magrack_wait', implemented: true },
    ],
  },
  {
    icon: '🧬', name: 'Thermal Cycler (200 µL)', className: 'ThermoCycler200ul',
    desc: 'Thermal cycler for 200 µL PCR tubes or plates; fluorescence detection not supported.',
    operations: [
      { method: 'open_lid()', desc: 'Opens the heated lid for loading or unloading plates.', command: 'thermal_cycler_open_lid', implemented: true },
      { method: 'close_lid()', desc: 'Closes the heated lid.', command: 'thermal_cycler_close_lid', implemented: true },
      { method: 'run_protocol(protocol)', desc: 'Executes a thermal cycling program composed of temperature holds and repeated cycles.', command: 'thermal_cycler_run_program', implemented: true },
      { method: 'pause()', desc: 'Pauses the currently executing protocol.', implemented: false },
      { method: 'resume()', desc: 'Resumes a paused protocol.', implemented: false },
      { method: 'stop()', desc: 'Immediately stops the protocol and cools the block to a safe standby temperature.', implemented: false },
    ],
  },
  {
    icon: '💧', name: 'Pipette', className: 'Pipette',
    desc: 'Robotic pipette with container-centric API and implicit tip management.',
    operations: [
      { method: 'transfer(volume, source, destination, reuse_tip, air_gap_volume)', desc: 'Transfers liquid between containers; validates volumes and supports optional tip reuse and air gap.', command: 'pipette_move', implemented: true },
      { method: 'mix(volume, location, repetitions, rate_per_minute, reuse_tip)', desc: 'Mixes container contents by repeated aspiration and dispensing at a given rate.', command: 'pipette_mix', implemented: true },
    ],
  },
  {
    icon: '🤖', name: 'Robot Arm', className: 'Robot',
    desc: 'Laboratory robot arm with container-centric pick-and-place operations.',
    operations: [
      { method: 'home()', desc: 'Moves the robot to a safe, known home position for calibration after power-on.', implemented: false },
      { method: 'move_container(container, destination)', desc: 'Picks up a container from its current location and places it at the destination.', command: 'robot_move_container', implemented: true },
      { method: 'open_port(port)', desc: 'Opens a specified instrument port (e.g., Priming-Port or SpotON).', command: 'open_port', implemented: true },
      { method: 'close_port(port)', desc: 'Closes a specified instrument port.', command: 'close_port', implemented: true },
    ],
  },
  {
    icon: '🧪', name: 'Sequencer', className: 'Sequencer',
    desc: 'DNA/RNA sequencer with a minimal start–monitor–stop interface.',
    operations: [
      { method: 'start_run(run_name, output_directory)', desc: 'Begins a new sequencing run; assumes flow cell and library are physically prepared.', command: 'start_sequencing', implemented: true },
      { method: 'stop_run()', desc: 'Gracefully stops the active sequencing run and finalizes data output.', implemented: false },
    ],
  },
  {
    icon: '❄️', name: 'Refrigerator', className: 'Refrigerator',
    desc: 'Passive low-temperature storage; container placement and retrieval are performed by the robot arm.',
    operations: [
      { method: 'get_current_temperature()', desc: 'Returns the current internal temperature of the refrigerator in Celsius.', implemented: false },
      { method: 'get_contents()', desc: 'Returns a list of all containers currently stored inside the refrigerator.', implemented: false },
      { method: 'set_target_temperature(celsius)', desc: 'Sets the target storage temperature for the refrigerator environment.', implemented: false },
    ],
  },
]

const serviceLifecycle = [
  {
    layer: 'AI Layer',
    title: 'Python API Call',
    detail: 'PDA-generated code invokes a self-describing method in lab_modules.py',
    example: 'pipette.transfer(...)',
  },
  {
    layer: 'Bridge',
    title: 'Atomic Command Dispatch',
    detail: 'Method body calls call_machine_command with a single scheduler action',
    example: '"pipette_move"',
  },
  {
    layer: 'Protocol',
    title: 'Protocol Flow Logged',
    detail: 'Action and parameters serialized for the scheduler to consume',
    example: 'protocol_flow.json',
  },
  {
    layer: 'Scheduler',
    title: 'Orchestration',
    detail: 'TransferManager parses steps, allocates equipment, and coordinates workflows',
    example: 'Workflow → Action',
  },
  {
    layer: 'Hardware',
    title: 'Firmware Execution',
    detail: 'Low-level drivers send PLC / Modbus commands to physical instruments',
    example: 'aspirate → dispense',
  },
]

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
