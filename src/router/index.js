import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/components/Signup.vue'
import LandningPage from '@/components/LandningPage.vue'
import SelectedItem from '@/components/SelectedItem.vue';  
import LoginPage from "@/components/LoginPage.vue";
import MyPage from '@/components/MyPage.vue';

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
        path: '/mypage',
        name: 'MyPage',
        component: MyPage
    },

    {
        path: '/item/:id',
        name: 'SelectedItem',
        component: SelectedItem
    },
    
    {
        path: '/',
        name: 'LandningPage',
        component: LandningPage
    },
    {
        path:'/cart',
        name: 'Cart',
        component: () => import('../components/ShoppingCart.vue')
    },
    {
        path: '/categories/:id/products',
        name: 'productsPage',
        component: () => import('../components/productsPage.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../components/CheckoutItems.vue')
    },
    {
        path: '/confirmationPage',
        name: 'confirmationPage',
        component: () => import('../components/ConfirmationPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
