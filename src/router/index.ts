import { App } from 'vue'
import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw
} from 'vue-router'
import routes from './router'
import autoload from './autoload'
import guard from './guard'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...routes]
})

export async function setupRouter(app: App) {
    // 自动加载路由
    autoload(router)

    // 路由守卫
    guard(router)

    // 注入路由
    app.use(router)
}

export default router
