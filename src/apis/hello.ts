import { http } from '@/plugins/axios'

export interface HelloInterface {
    name: string
}

export function get() {
    return http.get<HelloInterface>('/hello')
}
