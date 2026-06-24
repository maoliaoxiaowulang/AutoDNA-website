import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ArchitecturePage from '../views/ArchitecturePage.vue'
import ApplicationsPage from '../views/ApplicationsPage.vue'
import ToolsPage from '../views/ToolsPage.vue'
import OxdnaViewerPage from '../views/OxdnaViewerPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/architecture', name: 'Architecture', component: ArchitecturePage },
  { path: '/applications', name: 'Applications', component: ApplicationsPage },
  { path: '/tools', name: 'Tools', component: ToolsPage },
  { path: '/tools/oxdna-viewer', name: 'OxdnaViewer', component: OxdnaViewerPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
