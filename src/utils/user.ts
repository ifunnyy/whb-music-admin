import { CacheEnum } from '@/enum/cacheEnum'
import {
    TokenInterface,
    login as loginRequest,
    info,
    InfoInterface,
    logout as logoutRequest
} from '@/apis/userApi'
import store from './store'
import router from '@/router'
import { userStore } from '@/store/userStore'

export function logout() {
    return new Promise(async (resolve, reject) => {
        const response = await logoutRequest()
        if (!response.result || response.code == -1) {
            // 错误
            reject(response.msg)
            return
        }
        store.remove(CacheEnum.TOKEN_NAME)
        router.push({ name: 'login' })
        resolve('')
    })
}

export async function login(
    username: string,
    password: string,
    isAccept: boolean = false
) {
    return new Promise(async (resolve, reject) => {
        const response = await loginRequest(username, password)

        if (!response.result || response.code == -1) {
            // 错误
            reject(response.msg)
            return
        }

        // 保留 token
        store.set(
            CacheEnum.TOKEN_NAME,
            response.data.token,
            1000 * 60 * 60 * 24 * (isAccept ? 10 : 1)
        )

        store.set(CacheEnum.USERNAME, username, 1000 * 60 * 60 * 24 * 100)

        // 获取用户信息
        userStore().getUserInfo()

        // 获取登录前的页面
        const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME)
        if (routeName) {
            router.push({ name: routeName })
        } else {
            router.push('/')
        }
        resolve('')
    })
}
