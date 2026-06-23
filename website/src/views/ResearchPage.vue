<template>
  <header class="page-header">
    <div class="container container--narrow">
      <span class="section-label">Research</span>
      <h1>Experimental Results</h1>
      <p class="section-subtitle" style="margin:0 auto;">
        AutoDNA achieves expert-level performance across multiple benchmarks, autonomously matching state-of-the-art manual optimization.
      </p>
    </div>
  </header>

  <!-- Key Metrics -->
  <section class="section">
    <div class="container">
      <div class="grid-3" v-observe>
        <div class="card" style="text-align:center;">
          <div class="stat-value" v-count-up="{ target: 97.7, suffix: '%', decimals: 1 }">0%</div>
          <div class="card__text">Step-Wise Synthesis Yield</div>
        </div>
        <div class="card" style="text-align:center;">
          <div class="stat-value" v-count-up="{ target: 83.27, suffix: '%', decimals: 2 }">0%</div>
          <div class="card__text">Full-Length Yield (8-cycle)</div>
        </div>
        <div class="card" style="text-align:center;">
          <div class="stat-value" v-count-up="{ target: 3.6, suffix: '×', decimals: 1 }">0×</div>
          <div class="card__text">Concurrent Speedup</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Comparison Table -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="margin-bottom:2rem;">
        <span class="section-label">Comparison</span>
        <h2 class="section-title">AutoDNA vs. Existing Platforms</h2>
      </div>
      <div v-observe style="overflow-x:auto;">
        <table class="table-compare">
          <thead>
            <tr><th>Capability</th><th>AutoDNA</th><th>Conventional Platforms</th></tr>
          </thead>
          <tbody>
            <tr v-for="row in comparison" :key="row.cap">
              <td><strong>{{ row.cap }}</strong></td>
              <td class="check">✓ {{ row.autodna }}</td>
              <td class="cross">✗ {{ row.conventional }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Optimization Charts -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">Optimization</span>
        <h2 class="section-title">Multi-Objective Optimization Trajectory</h2>
        <p class="section-subtitle" style="margin:0 auto;">
          Across 5 iterations, AutoDNA autonomously explored buffers, surfactants, cofactors, enzymes, and reaction time.
        </p>
      </div>
      <div class="grid-2">
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Step-Wise Yield</h4>
          <div class="chart-bars">
            <div v-for="d in yieldData" :key="d.label" class="chart-bar"
              v-chart-bar="d.h"
              :style="{flex: 1, background: d.best ? 'var(--color-accent)' : 'var(--color-primary)'}">
              <div class="chart-bar-value">{{ d.v }}</div>
              <div class="chart-bar-label">{{ d.label }}</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">B&W buffer → +Tween-20 → +CoCl → +Enzyme/dNTP</p>
        </div>
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Normalized Speed</h4>
          <div class="chart-bars">
            <div v-for="d in speedData" :key="d.label" class="chart-bar"
              v-chart-bar="d.h"
              :style="{flex: 1, background: 'var(--color-success)'}">
              <div class="chart-bar-value">{{ d.v }}</div>
              <div class="chart-bar-label">{{ d.label }}</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">Yield prioritized — agent halted when speed reduced yield</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Error Analysis -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">Error Analysis</span>
        <h2 class="section-title">Nanopore Sequencing Error Profile</h2>
      </div>
      <div class="grid-2">
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Error Type Distribution</h4>
          <div class="chart-bars">
            <div class="chart-bar" v-chart-bar="170" :style="{flex: 4, background: 'var(--color-warning)'}">
              <div class="chart-bar-value">2.35%</div><div class="chart-bar-label">Deletion</div>
            </div>
            <div class="chart-bar" v-chart-bar="20" :style="{flex: 1, background: 'var(--color-error)'}">
              <div class="chart-bar-value">0.25%</div><div class="chart-bar-label">Insertion</div>
            </div>
            <div class="chart-bar" v-chart-bar="12" :style="{flex: 1, background: '#46BDC6'}">
              <div class="chart-bar-value">0.12%</div><div class="chart-bar-label">Substitution</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">Primary error: deletion (magnetic bead aggregation)</p>
        </div>
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Per-Cycle Yield (8-cycle: 3'-GTGTGTGT-5')</h4>
          <div class="chart-bars">
            <div v-for="(d, i) in cycleData" :key="i" class="chart-bar"
              v-chart-bar="d"
              :style="{flex: 1, background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}">
              <div class="chart-bar-label">{{ i % 2 === 0 ? '+T' : '+G' }}</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">Avg step-wise yield: 97.7%</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Multi-User Performance -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">Throughput</span>
        <h2 class="section-title">Multi-User Scheduling Performance</h2>
      </div>
      <div class="grid-2">
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Experiment Time</h4>
          <div class="chart-bars">
            <div class="chart-bar" v-chart-bar="170" :style="{flex: 2, background: 'var(--color-error)'}">
              <div class="chart-bar-value">1,434.7 min</div><div class="chart-bar-label">Sequential</div>
            </div>
            <div class="chart-bar" v-chart-bar="47" :style="{flex: 1, background: 'var(--color-success)'}">
              <div class="chart-bar-value">398.7 min</div><div class="chart-bar-label">AutoDNA</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">3.60× speedup</p>
        </div>
        <div class="card" v-observe>
          <h4 style="font-size:1rem;margin-bottom:1.5rem;">Instrument Utilization</h4>
          <div class="chart-bars">
            <div class="chart-bar" v-chart-bar="55" :style="{flex: 1, background: 'var(--color-primary)', opacity: 0.5}">
              <div class="chart-bar-value">55%</div><div class="chart-bar-label">Seq. Heater</div>
            </div>
            <div class="chart-bar" v-chart-bar="79" :style="{flex: 1, background: 'var(--color-success)'}">
              <div class="chart-bar-value">79%</div><div class="chart-bar-label">AutoDNA</div>
            </div>
            <div class="chart-bar" v-chart-bar="48" :style="{flex: 1, background: 'var(--color-accent)', opacity: 0.5}">
              <div class="chart-bar-value">48%</div><div class="chart-bar-label">Seq. Cycler</div>
            </div>
            <div class="chart-bar" v-chart-bar="81" :style="{flex: 1, background: 'var(--color-warning)'}">
              <div class="chart-bar-value">81%</div><div class="chart-bar-label">AutoDNA</div>
            </div>
          </div>
          <p style="font-size:0.8125rem;color:var(--color-text-light);text-align:center;margin-top:0.5rem;">Heater +24%, Cycler +33%</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const comparison = [
  { cap:'Autonomous protocol design', autodna:'Multi-agent collaborative', conventional:'Requires human heuristics' },
  { cap:'Multi-objective optimization', autodna:'Autonomous exploration', conventional:'Predefined search space' },
  { cap:'Hardware abstraction', autodna:'AI-native atomic services', conventional:'Manual instrument modeling' },
  { cap:'Multi-user concurrency', autodna:'Dynamic scheduling', conventional:'Sequential execution' },
  { cap:'Literature integration', autodna:'Automated retrieval & analysis', conventional:'Manual literature review' },
  { cap:'End-to-end autonomy', autodna:'Zero human intervention', conventional:'Requires expert oversight' },
]

const yieldData = [
  { label:'Iter 1', v:'93.0%', h:155 },
  { label:'Iter 2', v:'94.0%', h:157 },
  { label:'Iter 3', v:'94.2%', h:158 },
  { label:'Iter 4', v:'96.2%', h:164 },
  { label:'Iter 5', v:'98.0%', h:168, best:true },
]

const speedData = [
  { label:'Iter 1', v:'1.0×', h:100 },
  { label:'Iter 2', v:'0.95×', h:95 },
  { label:'Iter 3', v:'0.80×', h:80 },
  { label:'Iter 4', v:'0.65×', h:65 },
  { label:'Iter 5', v:'0.50×', h:50 },
]

const cycleData = [148, 152, 152, 152, 153, 149, 145, 147]
</script>
