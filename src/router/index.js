import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/components/Signup.vue'
import Home from '@/components/Home.vue'
import LandningPage from '@/components/LandningPage.vue'
import SelectedItem from '@/components/SelectedItem.vue';  

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
        name: 'LandningPage',
        component: LandningPage
    },

    {
        path: '/selected-item/:id',  
        name: 'SelectedItem',
        component: SelectedItem,
        props: true  
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
