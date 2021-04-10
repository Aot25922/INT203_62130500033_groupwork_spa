import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cardList from './components/ShowCard.vue'
import './assets/tailwind.css'
// import './assets/tailwind.css'
const app =createApp(App)
// make your Vue app aware of routes
app.component('card-list',cardList)
app.use(router).mount('#app')