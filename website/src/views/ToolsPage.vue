<template>
  <header class="page-header">
    <div class="container container--narrow">
      <span class="section-label">Tools</span>
      <h1>Tools & Resources</h1>
      <p class="section-subtitle" style="margin:0 auto;">
        Molecular visualization utilities for oxDNA simulations, running entirely in your browser.
      </p>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <div class="app-block" v-observe>
        <div>
          <span class="section-label">3D Viewer</span>
          <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">3D Structure Viewer</h3>
          <p>An interactive WebGL molecular structure viewer for oxDNA simulations. Drop in a topology and trajectory file to instantly visualize your structure in 3D — no installation required, runs entirely in the browser.</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1.25rem;margin-bottom:1.5rem;">
            <span class="tag tag--purple">3D Interactive</span>
            <span class="tag tag--blue">Multi-frame Playback</span>
            <span class="tag tag--green">Per-chain Coloring</span>
            <span class="tag">Nucleotide Tracking</span>
          </div>
          <router-link to="/tools/oxdna-viewer" class="btn btn--primary">
            Launch 3D Viewer →
          </router-link>
        </div>

        <div class="app-block__visual">
          <div>
            <div style="font-size:4rem;margin-bottom:1.25rem;">🧬</div>
            <div style="display:flex;gap:0.5rem;justify-content:center;align-items:center;flex-wrap:wrap;">
              <span style="background:rgba(66,133,244,0.1);color:var(--color-primary);padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;font-family:var(--font-mono);">.top</span>
              <span style="color:var(--color-text-light);font-size:1.25rem;">+</span>
              <span style="background:rgba(124,77,255,0.1);color:var(--color-accent);padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;font-family:var(--font-mono);">.dat</span>
              <span style="color:var(--color-text-light);font-size:1.25rem;">→</span>
              <span style="background:var(--color-gradient);color:#fff;padding:8px 16px;border-radius:var(--radius-full);font-size:0.875rem;font-weight:600;">3D</span>
            </div>
            <p style="margin-top:1.25rem;font-size:0.875rem;color:var(--color-text-secondary);">Drop files — view instantly in browser</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

