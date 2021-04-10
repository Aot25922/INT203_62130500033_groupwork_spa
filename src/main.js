import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/tailwind.css'
const app =createApp(App)
// make your Vue app aware of routes
app.use(router).mount('#app')