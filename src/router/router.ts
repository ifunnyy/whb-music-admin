import { RouteRecordRaw } from 'vue-router'

// 基础路由
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'admin',
        component: () => import('../layouts/admin.vue'),
        meta: { auth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Auth/login.vue'),
        meta: { guest: true }
    },
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('../views/Error/404.vue'),
        meta: { auth: false }
    }
]

export default routes
