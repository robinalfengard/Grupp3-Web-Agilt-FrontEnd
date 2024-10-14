import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/components/Signup.vue'
import Home from '@/components/Home.vue'
import LandningPage from '@/components/LandningPage.vue'
import SelectedItem from '@/components/SelectedItem.vue';  
import LoginPage from "@/components/LoginPage.vue";

const routes = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },

    {
        path: '/home',
        name: 'Home',
        component: Home
    },

    {
        path: '/',
        name: 'LandningPage',
        component: LandningPage
    },
    {
        path: '/categories/:id/products',
        name: 'productsPage',
        component: () => import('../components/productsPage.vue')
    },
    {
        path: '/selected-item/:id',  
        name: 'SelectedItem',
        component: SelectedItem
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
