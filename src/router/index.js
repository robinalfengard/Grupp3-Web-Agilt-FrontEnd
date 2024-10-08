import {createRouter, createWebHistory} from 'vue-router'
import Signup from '@/components/Signup.vue'
import Home from '@/components/Home.vue'
import LandningPage from '@/components/LandningPage.vue'


const routes = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },

    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        component: LandningPage
    },
    {
        path: '/categories/:id/products',
        name: 'productsPage',
        component: () => import('../components/productsPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router