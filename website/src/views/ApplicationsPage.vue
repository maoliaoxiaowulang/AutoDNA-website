<template>
  <header class="page-header">
    <div class="container container--narrow">
      <span class="section-label">Applications</span>
      <h1>End-to-End Services</h1>
      <p class="section-subtitle" style="margin:0 auto;">
        From simple nucleic acid tests to complex DNA data storage — all executed autonomously through natural language instructions.
      </p>
    </div>
  </header>

  <!-- App 1: Nucleic Acid Testing -->
  <section class="section">
    <div class="container">
      <div class="app-block" v-observe>
        <div>
          <span class="section-label">Application 1</span>
          <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Nucleic Acid Testing</h3>
          <p>RPA-based isothermal amplification for viral diagnostics, genetic disease screening, and environmental monitoring. The Experiment Planner Agent directly generates a three-step workflow — reagent mixing, incubation, and fluorescence detection.</p>
          <div style="display:flex;gap:2rem;margin-bottom:1rem;">
            <div><div class="app-metric-value">✓</div><div class="app-metric-label">Diagnostic Concordance</div></div>
            <div><div class="app-metric-value">3</div><div class="app-metric-label">Autonomous Steps</div></div>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span class="tag tag--blue">RPA</span>
            <span class="tag tag--green">Isothermal</span>
            <span class="tag">Fluorescence Detection</span>
          </div>
        </div>
        <div class="app-block__visual">
          <div>
            <div style="font-size:4rem;margin-bottom:1rem;">🧪</div>
            <div style="display:flex;gap:0.5rem;justify-content:center;align-items:center;">
              <span style="background:var(--color-primary);color:#FFF;padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;">Mix</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:var(--color-accent);color:#FFF;padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;">Incubate</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:var(--color-success);color:#FFF;padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;">Detect</span>
            </div>
            <p style="margin-top:1rem;font-size:0.875rem;color:var(--color-text-secondary);">Manual & AutoDNA — statistically equivalent</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- App 2: Enzymatic DNA Synthesis -->
  <section class="section section--alt">
    <div class="container">
      <div class="app-block" v-observe>
        <div class="app-block__visual">
          <div>
            <div style="font-size:4rem;margin-bottom:1rem;">🧬</div>
            <div style="font-size:3rem;font-weight:700;color:var(--color-primary);">97.7%</div>
            <p style="font-size:0.875rem;color:var(--color-text-secondary);">Step-wise average yield</p>
            <div style="margin-top:0.75rem;font-size:0.875rem;">
              <span style="color:var(--color-success);">●</span> Full-length: 83.27%
              <span style="color:var(--color-warning);">●</span> Deletion: 2.35%<br>
              <span style="color:var(--color-error);">●</span> Insertion: 0.25%
              <span style="color:#46BDC6;">●</span> Substitution: 0.12%
            </div>
          </div>
        </div>
        <div>
          <span class="section-label">Application 2</span>
          <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Enzymatic DNA Synthesis</h3>
          <p>Next-generation enzymatic de novo DNA synthesis using engineered TdT enzyme. AutoDNA autonomously explores optimization across buffers, surfactants, reaction time, and reagent concentrations — achieving expert-level performance.</p>
          <div style="display:flex;gap:2rem;margin-bottom:1rem;">
            <div><div class="app-metric-value">5</div><div class="app-metric-label">Optimization Rounds</div></div>
            <div><div class="app-metric-value">6</div><div class="app-metric-label">Dimensions Explored</div></div>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span class="tag tag--purple">TdT Enzyme</span>
            <span class="tag">Multi-Objective</span>
            <span class="tag tag--green">PAGE Analysis</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- App 3: DNA Data Storage -->
  <section class="section">
    <div class="container">
      <div class="app-block" v-observe>
        <div>
          <span class="section-label">Application 3</span>
          <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">DNA Data Storage</h3>
          <p>End-to-end autonomous DNA data storage: encoding → synthesis → storage → sequencing → decoding. 25 instruments across 11,386 hardware steps, completing a full write-read cycle in 162.9 hours with zero manual intervention.</p>
          <div style="display:flex;gap:2rem;margin-bottom:1rem;">
            <div><div class="app-metric-value">11,386</div><div class="app-metric-label">Hardware Steps</div></div>
            <div><div class="app-metric-value">78</div><div class="app-metric-label">Strands Synthesized</div></div>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span class="tag tag--blue">Encoding</span>
            <span class="tag tag--purple">Synthesis</span>
            <span class="tag">Nanopore Sequencing</span>
          </div>
        </div>
        <div class="app-block__visual">
          <div>
            <div style="font-size:4rem;margin-bottom:1rem;">💾</div>
            <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;align-items:center;">
              <span style="background:var(--color-primary);color:#FFF;padding:6px 10px;border-radius:var(--radius-full);font-size:0.75rem;">Encode</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:var(--color-accent);color:#FFF;padding:6px 10px;border-radius:var(--radius-full);font-size:0.75rem;">Write</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:var(--color-warning);color:#1A1A2E;padding:6px 10px;border-radius:var(--radius-full);font-size:0.75rem;">Store</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:var(--color-success);color:#FFF;padding:6px 10px;border-radius:var(--radius-full);font-size:0.75rem;">Read</span>
              <span style="color:var(--color-text-light);">→</span>
              <span style="background:#46BDC6;color:#FFF;padding:6px 10px;border-radius:var(--radius-full);font-size:0.75rem;">Decode</span>
            </div>
            <p style="margin-top:1rem;font-style:italic;color:var(--color-text-secondary);">"Intelligence is the ability to adapt to change."</p>
            <p style="font-size:0.75rem;color:var(--color-text-light);">— Stephen Hawking, successfully stored & decoded</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- App 4: Multi-User -->
  <section class="section section--alt">
    <div class="container">
      <div class="app-block" v-observe>
        <div class="app-block__visual">
          <div>
            <div style="font-size:4rem;margin-bottom:1rem;">⚡</div>
            <div style="font-size:3rem;font-weight:700;color:var(--color-primary);">3×</div>
            <p style="font-size:0.875rem;color:var(--color-text-secondary);">Throughput improvement</p>
            <div style="margin-top:1rem;display:flex;gap:1.5rem;justify-content:center;">
              <div><div style="font-weight:700;color:var(--color-success);">80.6%</div><div style="font-size:0.75rem;color:var(--color-text-light);">Heater</div></div>
              <div><div style="font-weight:700;color:var(--color-success);">79.0%</div><div style="font-size:0.75rem;color:var(--color-text-light);">Thermal Cycler</div></div>
            </div>
          </div>
        </div>
        <div>
          <span class="section-label">Application 4</span>
          <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Multi-User Concurrency</h3>
          <p>Handles concurrent multi-user requests with real-time instrument-aware scheduling. When conflicts arise, dynamically reroutes procedures to functionally equivalent instruments — e.g., substituting an occupied heater with an available thermal cycler.</p>
          <div style="display:flex;gap:2rem;margin-bottom:1rem;">
            <div><div class="app-metric-value">168.8 min</div><div class="app-metric-label">Saved vs Serial</div></div>
            <div><div class="app-metric-value">3.6×</div><div class="app-metric-label">Parallel Speedup</div></div>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span class="tag tag--green">Real-Time</span>
            <span class="tag">Dynamic Routing</span>
            <span class="tag tag--purple">Resource Sharing</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
