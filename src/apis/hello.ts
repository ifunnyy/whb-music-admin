import { http } from '@/plugins/axios'

export interface HelloInterface {
    name: string
}

export function get() {
    return http.requect<HelloInterface>({
        url: `hello`
    })
}
