<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': menuOpen }">
    <div class="nav__inner">
      <router-link to="/" class="nav__logo" @click="closeMenu">
        <span class="nav__logo-icon">🧬</span>
        AutoDNA
      </router-link>
      <button class="nav__toggle" :class="{ 'nav__toggle--open': menuOpen }"
        @click="menuOpen = !menuOpen" aria-label="Toggle menu" :aria-expanded="menuOpen">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <li v-for="item in links" :key="item.to">
          <router-link :to="item.to" class="nav__link" active-class="nav__link--active"
            exact-active-class="nav__link--active" @click="closeMenu">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/applications', label: 'Applications' },
  { to: '/research', label: 'Research' },
  { to: '/publication', label: 'Publication' },
]

function closeMenu() { menuOpen.value = false }

function onScroll() { scrolled.value = window.scrollY > 20 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--nav-height); z-index: 1000;
  display: flex; align-items: center;
  transition: background var(--transition-base), box-shadow var(--transition-base);
}
.nav--scrolled {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--color-border);
}
.nav__inner {
  width: 100%; max-width: var(--max-width);
  padding: 0 2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.nav__logo {
  font-family: var(--font-heading);
  font-size: 1.25rem; font-weight: 700;
  color: var(--color-text);
  display: flex; align-items: center; gap: 0.5rem;
}
.nav__logo-icon {
  width: 32px; height: 32px;
  border-radius: var(--radius-sm);
  background: var(--color-gradient);
  display: flex; align-items: center; justify-content: center;
  color: #FFF; font-size: 1.125rem;
}
.nav__links { display: flex; align-items: center; gap: 0.25rem; list-style: none; }
.nav__link {
  display: inline-flex; align-items: center;
  padding: 0.625rem 1.25rem;
  font-size: 1rem; font-weight: 500;
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  text-decoration: none;
}
.nav__link:hover { color: var(--color-primary); background: rgba(66,133,244,0.06); }
.nav__link--active { color: var(--color-primary); background: rgba(66,133,244,0.08); }
.nav__toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 0.5rem; }
.nav__toggle span { display: block; width: 22px; height: 2px; background: var(--color-text); border-radius: 2px; transition: all var(--transition-fast); }

@media (max-width: 768px) {
  .nav__links {
    position: fixed; top: var(--nav-height); left: 0; right: 0;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(16px);
    flex-direction: column; padding: 1.5rem; gap: 0.5rem;
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-100%); opacity: 0; pointer-events: none;
    transition: all var(--transition-base);
  }
  .nav__links--open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nav__toggle { display: flex; }
  .nav__toggle--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__toggle--open span:nth-child(2) { opacity: 0; }
  .nav__toggle--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
</style>
