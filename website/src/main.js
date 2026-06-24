import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vObserve, vCountUp, vChartBar, vPipelineAnimate, vStagger } from './composables/useAnimate'
import './style.css'

const app = createApp(App)
app.directive('observe', vObserve)
app.directive('count-up', vCountUp)
app.directive('chart-bar', vChartBar)
app.directive('pipeline-animate', vPipelineAnimate)
app.directive('stagger', vStagger)
app.use(router)
app.mount('#app')
