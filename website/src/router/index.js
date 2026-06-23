import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ArchitecturePage from '../views/ArchitecturePage.vue'
import ApplicationsPage from '../views/ApplicationsPage.vue'
import ToolsPage from '../views/ToolsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/architecture', name: 'Architecture', component: ArchitecturePage },
  { path: '/applications', name: 'Applications', component: ApplicationsPage },
  { path: '/tools', name: 'Tools', component: ToolsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
