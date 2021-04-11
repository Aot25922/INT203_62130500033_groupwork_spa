import { createRouter , createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import Add from '../view/Add.vue'
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/add',
        name: 'Add',
        component: Add
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router