<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">🧬 AutoDNA</div>
          <p>AI-Native Autonomous Laboratory for Biomolecular Engineering. A research project from Shanghai Jiao Tong University.</p>
        </div>
        <div>
          <div class="footer__heading">Pages</div>
          <ul class="footer__links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/architecture">Architecture</router-link></li>
            <li><router-link to="/applications">Applications</router-link></li>
            <li><router-link to="/tools">Tools</router-link></li>
          </ul>
        </div>
        <div>
          <div class="footer__heading">Links</div>
          <ul class="footer__links">
            <li><a href="https://github.com/IPADS-X/AutoDNA" target="_blank" rel="noopener">GitHub Repository</a></li>
            <li><a href="https://arxiv.org/abs/2507.02379" target="_blank" rel="noopener">arXiv Paper</a></li>
            <li><a href="https://ipads.se.sjtu.edu.cn/" target="_blank" rel="noopener">IPADS Lab</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2025 Shanghai Jiao Tong University. Licensed under Apache 2.0.</span>
        <span>IPADS · School of Chemistry and Chemical Engineering</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
@media (max-width: 768px) { .footer__grid { grid-template-columns: 1fr; gap: 1.5rem; } }
</style>
