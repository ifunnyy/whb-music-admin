import { http } from '@/plugins/axios'

// 用户详细
export interface MenuInterface {
    id: number
    pid: number
    name: string
    title: string
    path: string
    redirect: string
    icon: string
    component: string
    sord: number
    type: number
    status: number
    pivot: {
        id: number
        admin_id: number
        permission_id: number
    }
    children: MenuInterface[]
}

// 角色信息
export interface RoleInterface {
    id: number
}

export interface InfoInterface {
    id: number
    username: string
    nickname: string
    gender: string
    locked: boolean
    enabled: boolean
    role: RoleInterface[]
    menus: MenuInterface[]
}

export function info() {
    return http.get<InfoInterface>('user/info')
}

export interface TokenInterface {
    token: string
}

export function login(username: string, password: string) {
    return http.post<TokenInterface>('user/login', {
        username,
        password
    })
}
