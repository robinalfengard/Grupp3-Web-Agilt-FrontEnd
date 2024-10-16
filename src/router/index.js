import {createRouter, createWebHistory} from 'vue-router'
import Signup from '@/components/Signup.vue'
import LandningPage from '@/components/LandningPage.vue'
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
        path: '/',
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router