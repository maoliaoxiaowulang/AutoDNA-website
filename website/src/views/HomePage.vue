<template>
  <!-- Hero -->
  <section class="hero hero--home">
    <div class="hero__orb orb-float-1" style="width:600px;height:600px;background:var(--color-primary);top:-200px;right:-100px;"></div>
    <div class="hero__orb orb-float-2" style="width:400px;height:400px;background:var(--color-accent);bottom:-100px;left:-50px;"></div>
    <div class="hero__orb orb-float-3" style="width:300px;height:300px;background:#46BDC6;top:50%;left:50%;"></div>
    <div class="hero__row">
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          Open Source — Apache 2.0
        </div>
        <h1><span class="text-gradient">AutoDNA</span></h1>
        <p class="hero__subtitle">
          An <strong>AI-native autonomous laboratory</strong> for biomolecular engineering.
          From DNA synthesis to data storage, it autonomously coordinates
          25+ instruments, optimizes experimental procedures, and matches
          state-of-the-art results — <em>without human intervention</em>.
        </p>
        <div class="hero__actions">
          <router-link to="/architecture" class="btn btn--primary btn--lg">Explore Architecture →</router-link>
          <router-link to="/applications" class="btn btn--secondary btn--lg">View Applications</router-link>
        </div>
      </div>
      <div class="hero__stats">
        <div class="card stat-simple">
          <div class="stat-icon">🔬</div>
          <div class="stat-value" v-count-up="{ target: 25, suffix: '+' }">0+</div>
          <div class="card__text">Instruments<br>Orchestrated</div>
        </div>
        <div class="card stat-simple">
          <div class="stat-icon">⚙️</div>
          <div class="stat-value" v-count-up="{ target: 9365, comma: true }">0</div>
          <div class="card__text">Autonomous<br>Hardware Steps</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Philosophy -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe>
        <span class="section-label">Core Philosophy</span>
        <h2 class="section-title">Model · Experiment · Instrument<br><span class="text-gradient">Co-Design</span></h2>
        <p class="section-subtitle">
          Unlike conventional "add-on" architectures where AI merely supplements
          existing hardware, AutoDNA is built from the ground up with AI at its core.
          This enables precise comprehension of experimental requirements and
          instrument capabilities.
        </p>
      </div>
      <div class="grid-3" style="margin-top:3rem;" v-observe>
        <div class="card">
          <div class="card__icon card__icon--blue">🧠</div>
          <h3 class="card__title">AI-Native Models</h3>
          <p class="card__text">Six specialized LLM agents collaborate through natural language, autonomously designing protocols, generating hypotheses, and writing instrument control code.</p>
        </div>
        <div class="card">
          <div class="card__icon card__icon--purple">🧪</div>
          <h3 class="card__title">Autonomous Experiments</h3>
          <p class="card__text">Closed-loop "design–experiment–optimize" cycles run without human intervention, exploring vast decision spaces across multiple objectives like yield, time, and cost.</p>
        </div>
        <div class="card">
          <div class="card__icon card__icon--green">🔬</div>
          <h3 class="card__title">Intelligent Instruments</h3>
          <p class="card__text">Hardware functionalities are abstracted into AI-native "atomic services," enabling agents to understand and reason about instrument capabilities.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- News -->
  <section class="section">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">News</span>
        <h2 class="section-title">Latest Updates</h2>
      </div>
      <div v-observe>
        <a href="https://arxiv.org/abs/2507.02379" target="_blank" rel="noopener" class="news-card">
          <div class="news-card__image">
            <img src="/paper.jpg" alt="AutoDNA Paper" class="news-card__img" />
          </div>
          <div class="news-card__body">
            <span class="news-card__date">July 2025</span>
            <h3 class="news-card__title">AutoDNA Paper Published on arXiv</h3>
            <p class="news-card__text">
              Our paper "An AI-native experimental laboratory for autonomous biomolecular engineering"
              is now available on arXiv. The paper presents the full AutoDNA system, experimental results,
              and the model-experiment-instrument co-design methodology.
            </p>
            <span class="news-card__link">Read Paper →</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Key Capabilities -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:3rem;">
        <span class="section-label">Capabilities</span>
        <h2 class="section-title">What AutoDNA Can Do</h2>
      </div>
      <div class="grid-2" v-observe>
        <div class="card" v-for="cap in capabilities" :key="cap.title" style="border-top:3px solid;" :style="{borderTopColor: cap.color}">
          <h3 class="card__title">{{ cap.icon }} {{ cap.title }}</h3>
          <p class="card__text">{{ cap.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <div class="container" style="text-align:center;" v-observe>
      <span class="section-label">Get Started</span>
      <h2 class="section-title">Science-as-a-Service, at Scale</h2>
      <p class="section-subtitle" style="margin:0 auto 2rem;">
        AutoDNA paves the way for advanced biomaterials research, establishing a
        blueprint for autonomous scientific discovery.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <router-link to="/research" class="btn btn--primary btn--lg">See Research Results →</router-link>
        <a href="https://github.com/IPADS-X/AutoDNA" class="btn btn--secondary btn--lg" target="_blank" rel="noopener">View on GitHub ↗</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const capabilities = [
  { icon:'🧬', title:'Nucleic Acid Testing', desc:'End-to-end autonomous RPA-based tests matching manual accuracy.', color:'var(--color-primary)' },
  { icon:'🔬', title:'Enzymatic DNA Synthesis', desc:'Multi-objective optimization achieving 97.7% step-wise yield.', color:'var(--color-accent)' },
  { icon:'💾', title:'DNA Data Storage', desc:'Full read-write cycle across 9,365 hardware steps — zero manual intervention.', color:'var(--color-success)' },
  { icon:'⚡', title:'Multi-User Concurrency', desc:'Dynamic scheduling improves throughput by 3× vs conventional systems.', color:'var(--color-warning)' },
]
</script>

<style scoped>
.hero--home {
  align-items: flex-start;
  padding-top: calc(var(--nav-height) + 6rem);
  min-height: 100vh;
}

.hero__row {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  padding: 0 2rem;
}

.hero__content {
  flex: 0 0 auto;
  max-width: 520px;
  padding-left: 5rem;
}

.hero__stats {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-shrink: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10rem;
}

.stat-simple {
  text-align: center;
  padding: 2rem 2.5rem;
  min-width: 180px;
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.stat-simple .stat-value {
  font-size: 3.5rem;
}

.hero__badge {
  margin-bottom: 1.5rem;
}

.hero h1 {
  margin-bottom: 1.5rem;
}

.hero__subtitle {
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.news-card {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: all var(--transition-base);
}

.news-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.news-card__image {
  flex-shrink: 0;
  width: 200px;
  min-height: 160px;
}

.news-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__body {
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-card__date {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
}

.news-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.news-card__text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.news-card__link {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .hero__row {
    flex-direction: column;
    gap: 2rem;
  }
  .hero__stats {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .stat-simple {
    flex: 1;
    min-width: 140px;
  }
  .news-card {
    flex-direction: column;
  }
  .news-card__image {
    width: 100%;
    height: 120px;
  }
}
</style>
