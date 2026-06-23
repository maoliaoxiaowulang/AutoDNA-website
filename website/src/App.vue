<template>
  <div>
    <NavBar />
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/shared/NavBar.vue'
import FooterSection from './components/shared/FooterSection.vue'
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
