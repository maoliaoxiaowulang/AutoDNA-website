<template>
  <header class="page-header">
    <div class="container container--narrow">
      <span class="section-label">Publication</span>
      <h1>Paper & Authors</h1>
      <p class="section-subtitle" style="margin:0 auto;">
        Research from IPADS and the School of Chemistry and Chemical Engineering, Shanghai Jiao Tong University.
      </p>
    </div>
  </header>

  <!-- Citation -->
  <section class="section">
    <div class="container container--narrow">
      <div class="citation" v-observe>
        <div style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem;">
          An AI-native experimental laboratory for autonomous biomolecular engineering
        </div>
        <p>
          Mingyu Wu<sup>1*</sup>, Zhaoguo Wang<sup>1*†</sup>, Jiabin Wang<sup>2*</sup>, Zhiyuan Dong<sup>1</sup>,
          Jingkai Yang<sup>1</sup>, Qingting Li<sup>2</sup>, Tianyu Huang<sup>1</sup>, Lei Zhao<sup>2</sup>,
          Mingqiang Li<sup>2</sup>, Fei Wang<sup>2†</sup>, Chunhai Fan<sup>2†</sup>, Haibo Chen<sup>1†</sup>
        </p>
        <p style="font-size:0.875rem;color:var(--color-text-light);margin-bottom:0.75rem;">
          <sup>*</sup> Equal contribution &nbsp;|&nbsp; <sup>†</sup> Corresponding authors
        </p>
        <p style="color:var(--color-text-secondary);margin-bottom:1rem;">
          <strong>1.</strong> Institute of Parallel and Distributed Systems (IPADS), Shanghai Jiao Tong University<br>
          <strong>2.</strong> School of Chemistry and Chemical Engineering, Shanghai Jiao Tong University
        </p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <span class="tag tag--blue">arXiv:2507.02379</span>
          <span class="tag">2025</span>
          <span class="tag tag--green">Apache 2.0</span>
        </div>
      </div>
      <div v-observe style="text-align:center;margin-top:2rem;">
        <a href="https://arxiv.org/abs/2507.02379" class="btn btn--primary" target="_blank" rel="noopener">Read Full Paper on arXiv ↗</a>
      </div>
    </div>
  </section>

  <!-- Authors -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">Authors</span>
        <h2 class="section-title">Research Team</h2>
      </div>
      <div v-observe style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;max-width:700px;margin:0 auto 2rem;">
        <span v-for="a in authors" :key="a.name" class="author-tag" :class="{ 'author-tag--corr': a.corr }">
          {{ a.name }}<span v-if="a.marks" class="author-mark">{{ a.marks }}</span>
        </span>
      </div>
      <div class="grid-2" v-observe style="max-width:800px;margin:0 auto;">
        <div class="card">
          <div class="card__icon card__icon--blue">💻</div>
          <h3 class="card__title">IPADS Team</h3>
          <p class="card__text"><strong>Systems & AI:</strong> Mingyu Wu, Zhaoguo Wang, Zhiyuan Dong, Jingkai Yang, Tianyu Huang<br><strong>Lead:</strong> Prof. Haibo Chen</p>
        </div>
        <div class="card">
          <div class="card__icon card__icon--green">🧪</div>
          <h3 class="card__title">Chemistry Team</h3>
          <p class="card__text"><strong>Chemistry & Biology:</strong> Jiabin Wang, Qingting Li, Lei Zhao, Mingqiang Li<br><strong>Lead:</strong> Prof. Fei Wang, Prof. Chunhai Fan</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Open Source -->
  <section class="section">
    <div class="container container--narrow" style="text-align:center;">
      <div v-observe>
        <span class="section-label">Open Source</span>
        <h2 class="section-title">Available on GitHub</h2>
        <p class="section-subtitle" style="margin:0 auto 2rem;">
          AutoDNA is fully open-source under Apache 2.0. The repository includes all four components, experimental data, and reproduction instructions.
        </p>
      </div>
      <div class="grid-3" v-observe style="margin-bottom:2rem;">
        <div class="card" style="text-align:center;">
          <div class="card__icon card__icon--blue" style="margin:0 auto 1rem;">📦</div>
          <div class="stat-value" style="font-size:2rem;">4</div>
          <div class="card__text">System Components</div>
        </div>
        <div class="card" style="text-align:center;">
          <div class="card__icon card__icon--purple" style="margin:0 auto 1rem;">🐍</div>
          <div class="stat-value" style="font-size:2rem;">6</div>
          <div class="card__text">AI Agents</div>
        </div>
        <div class="card" style="text-align:center;">
          <div class="card__icon card__icon--green" style="margin:0 auto 1rem;">📊</div>
          <div class="stat-value" style="font-size:2rem;">15</div>
          <div class="card__text">Technology Languages</div>
        </div>
      </div>
      <div v-observe>
        <a href="https://github.com/IPADS-X/AutoDNA" class="btn btn--primary btn--lg" target="_blank" rel="noopener">View Repository on GitHub ↗</a>
      </div>
    </div>
  </section>

  <!-- References -->
  <section class="section section--alt">
    <div class="container">
      <div v-observe style="text-align:center;margin-bottom:2rem;">
        <span class="section-label">References</span>
        <h2 class="section-title">Related Work</h2>
      </div>
      <div v-observe style="max-width:800px;margin:0 auto;">
        <div class="card">
          <div class="card__text" v-for="ref in displayedRefs" :key="ref.id" style="margin-bottom:0.25rem;">
            <strong>[{{ ref.id }}]</strong> {{ ref.text }}
          </div>
          <div v-if="!showAll" style="text-align:center;margin-top:1rem;color:var(--color-text-light);font-size:0.9375rem;">
            ... and {{ references.length - previewCount }} more references
          </div>
          <div style="text-align:center;margin-top:1rem;">
            <button class="btn btn--secondary" @click="showAll = !showAll">
              {{ showAll ? 'Show Less ▲' : `Show All ${references.length} References ▼` }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="section">
    <div class="container container--narrow" style="text-align:center;">
      <div v-observe style="margin-bottom:2rem;">
        <span class="section-label">Contact</span>
        <h2 class="section-title">Corresponding Authors</h2>
      </div>
      <div class="grid-2" v-observe>
        <div class="card" v-for="c in contacts" :key="c.name">
          <h3 class="card__title">{{ c.name }}</h3>
          <p class="card__text" style="font-family:var(--font-mono);font-size:0.875rem;">{{ c.email }}</p>
          <p class="card__text">{{ c.dept }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const authors = [
  { name:'Mingyu Wu', marks:'*' },
  { name:'Zhaoguo Wang', marks:'*†', corr:true },
  { name:'Jiabin Wang', marks:'*' },
  { name:'Zhiyuan Dong' },
  { name:'Jingkai Yang' },
  { name:'Qingting Li' },
  { name:'Tianyu Huang' },
  { name:'Lei Zhao' },
  { name:'Mingqiang Li' },
  { name:'Fei Wang', marks:'†', corr:true },
  { name:'Chunhai Fan', marks:'†', corr:true },
  { name:'Haibo Chen', marks:'†', corr:true },
]

const contacts = [
  { name:'Zhaoguo Wang', email:'zhaoguowang@sjtu.edu.cn', dept:'IPADS, SJTU' },
  { name:'Fei Wang', email:'wangfeu@sjtu.edu.cn', dept:'School of Chemistry, SJTU' },
  { name:'Chunhai Fan', email:'fanchunhai@sjtu.edu.cn', dept:'School of Chemistry, SJTU' },
  { name:'Haibo Chen', email:'haibochen@sjtu.edu.cn', dept:'IPADS, SJTU' },
]

const references = [
  { id:1, text:'Burger, B. et al. "A mobile robotic chemist." Nature 583, 237–241 (2020).' },
  { id:2, text:'Boiko, D. A., MacKnight, R., Kline, B. & Gomes, G. "Autonomous chemical research with large language models." Nature 624, 570–578 (2023).' },
  { id:3, text:'Dai, T. et al. "Autonomous mobile robots for exploratory synthetic chemistry." Nature 1–8 (2024).' },
  { id:4, text:'Ha, T. et al. "AI-driven robotic chemist for autonomous synthesis of organic molecules." Sci. Adv. 9, eadj0461 (2023).' },
  { id:5, text:'Lu, X. et al. "Enzymatic DNA synthesis by engineering terminal deoxynucleotidyl transferase." ACS Catal. 12, 2988–2997 (2022).' },
  { id:6, text:'Steiner, S. et al. "Organic synthesis in a modular robotic system driven by a chemical programming language." Science 363, eaav2211 (2019).' },
  { id:7, text:'Mehr, S. H. M., Craven, M., Leonov, A. I., Keenan, G. & Cronin, L. "A universal system for digitization and automatic execution of the chemical synthesis literature." Science 370, 101–108 (2020).' },
  { id:8, text:'Abolhasani, M. & Kumacheva, E. "The rise of self-driving labs in chemical and materials sciences." Nat. Synth. 2, 483–492 (2023).' },
  { id:9, text:'Seifrid, M. et al. "Autonomous chemical experiments: challenges and perspectives on establishing a self-driving lab." Acc. Chem. Res. 55, 2454–2466 (2022).' },
  { id:10, text:'Darvish, K. et al. "ORGANA: a robotic assistant for automated chemistry experimentation and characterization." Matter 8 (2025).' },
  { id:11, text:'Song, T. et al. "A multiagent-driven robotic AI chemist enabling autonomous chemical research on demand." J. Am. Chem. Soc. 147, 12534–12545 (2025).' },
  { id:12, text:'Touvron, H. et al. "LLaMA: open and efficient foundation language models." Preprint at arXiv:2302.13971 (2023).' },
  { id:13, text:'Zhang, S. et al. "OPT: open pre-trained transformer language models." Preprint at arXiv:2205.01068 (2022).' },
  { id:14, text:'Anthropic. "Introducing Claude 3.5 Sonnet." https://www.anthropic.com/news/claude-3-5-sonnet (2024).' },
  { id:15, text:'Brown, T. B. et al. "Language models are few-shot learners." Preprint at arXiv:2005.14165 (2020).' },
  { id:16, text:'Yu, B., Baker, F. N., Chen, Z., Ning, X. & Sun, H. "LlaSMol: advancing large language models for chemistry." Preprint at arXiv:2402.09391 (2024).' },
  { id:17, text:'Xie, T. et al. "DARWIN series: domain specific large language models for natural science." Preprint at arXiv:2308.13565 (2023).' },
  { id:18, text:'Jablonka, K. M., Schwaller, P., Ortega-Guerrero, A. & Smit, B. "Leveraging large language models for predictive chemistry." Nat. Mach. Intell. 6, 161–169 (2024).' },
  { id:19, text:'Antunes, L. M., Butler, K. T. & Grau-Crespo, R. "Crystal structure generation with autoregressive large language modeling." Nat. Commun. 15, 10570 (2024).' },
  { id:20, text:'Frey, N. C. et al. "Neural scaling of deep chemical models." Nat. Mach. Intell. 5, 1297–1305 (2023).' },
  { id:21, text:'Chaves, J. M. Z. et al. "Tx-LLM: a large language model for therapeutics." Preprint at arXiv:2406.06316 (2024).' },
  { id:22, text:'Meiser, L. C. et al. "Reading and writing digital data in DNA." Nat. Protoc. 15, 86–101 (2020).' },
  { id:23, text:'Daher, R. K., Stewart, G., Boissinot, M. & Bergeron, M. G. "Recombinase polymerase amplification for diagnostic applications." Clin. Chem. 62, 947–958 (2016).' },
  { id:24, text:'Gao, S. et al. "Empowering biomedical discovery with AI agents." Cell 187, 6125–6151 (2024).' },
  { id:25, text:'Ramos, M. C., Collison, C. J. & White, A. D. "A review of large language models and autonomous agents in chemistry." Chem. Sci. 16, 2514–2572 (2025).' },
  { id:26, text:'OpenAI. "Introducing ChatGPT." https://openai.com/index/chatgpt/ (2022).' },
  { id:27, text:'OpenAI. "Learning to reason with LLMs." https://openai.com/index/learning-to-reason-with-llms/ (2024).' },
  { id:28, text:'Ouyang, L. et al. "Training language models to follow instructions with human feedback." Adv. Neural Inf. Process. Syst. 35, 27730–27744 (2022).' },
  { id:29, text:'Zelikman, E. et al. "Quiet-STaR: language models can teach themselves to think before speaking." Preprint at arXiv:2403.09629 (2024).' },
  { id:30, text:'Lála, J. et al. "PaperQA: retrieval-augmented generative agent for scientific research." Preprint at arXiv:2312.07559 (2023).' },
  { id:31, text:'Lewis, P. et al. "Retrieval-augmented generation for knowledge-intensive NLP tasks." Adv. Neural Inf. Process. Syst. 33, 9459–9474 (2020).' },
  { id:32, text:'Tanaka, T. & Letsinger, R. L. "Syringe method for stepwise chemical synthesis of oligonucleotides." Nucleic Acids Res. 10, 3249–3259 (1982).' },
  { id:33, text:'Hoose, A., Vellacott, R., Storch, M., Freemont, P. S. & Ryadnov, M. G. "DNA synthesis technologies to close the gene writing gap." Nat. Rev. Chem. 7, 144–161 (2023).' },
  { id:34, text:'Lee, H. et al. "Photon-directed multiplexed enzymatic DNA synthesis for molecular digital data storage." Nat. Commun. 11, 5246 (2020).' },
  { id:35, text:'M. Bran, A. et al. "Augmenting large language models with chemistry tools." Nat. Mach. Intell. 6, 525–535 (2024).' },
  { id:36, text:'Ruan, Y. et al. "An automatic end-to-end chemical synthesis development platform powered by large language models." Nat. Commun. 15, 10160 (2024).' },
  { id:37, text:'Li, K. et al. "DNA-DISK: automated end-to-end data storage via enzymatic single-nucleotide DNA synthesis and sequencing on digital microfluidics." Proc. Natl. Acad. Sci. 121, e2410164121 (2024).' },
  { id:38, text:'Takahashi, C. N., Nguyen, B. H., Strauss, K. & Ceze, L. "Demonstration of end-to-end automation of DNA data storage." Sci. Rep. 9, 4998 (2019).' },
  { id:39, text:'Zhirnov, V., Zadegan, R. M., Sandhu, G. S., Church, G. M. & Hughes, W. L. "Nucleic acid memory." Nat. Mater. 15, 366–370 (2016).' },
  { id:40, text:'Church, G. M., Gao, Y. & Kosuri, S. "Next-generation digital information storage in DNA." Science 337, 1628 (2012).' },
]

const showAll = ref(false)
const previewCount = 6

const displayedRefs = computed(() => {
  return showAll.value ? references : references.slice(0, previewCount)
})
</script>
