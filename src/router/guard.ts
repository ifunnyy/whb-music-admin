import { Router, RouteLocationNormalized, RouteMeta } from 'vue-router'
import utils from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'
// 路由守卫
// 可以在组件通过 router.meta.auth 设置是否需要登录
class Guard {
    constructor(private router: Router) {}
    run() {
        this.router.beforeEach(this.beforeEach.bind(this))
    }

    private async beforeEach(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized
    ) {
        if (to.name == 'admin') {
            if (this.getToken()) {
                return { name: 'data' }
            }
            return { name: 'login' }
        }

        if (this.isLogin(to) === false) {
            return { name: 'login' }
        }
        if (this.isGuest(to) === false) {
            return from
        }
    }

    // 开始检测
    private isLogin(to: RouteLocationNormalized): boolean {
        const meta = to.meta as RouteMeta
        let state = true

        if (meta.auth && !this.getToken()) {
            state = false

            utils.store.set(CacheEnum.REDIRECT_ROUTE_NAME, to.name)
        }
        return state
    }

    // 开始检测
    private isGuest(to: RouteLocationNormalized): boolean {
        const meta = to.meta as RouteMeta

        if (meta.guest && this.getToken()) return false
        return true
    }

    private getToken(): string | null {
        return utils.store.get(CacheEnum.TOKEN_NAME)
    }
}

export default (router: Router) => {
    new Guard(router).run()
}
