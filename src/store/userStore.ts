import { defineStore } from 'pinia'
import { info, InfoInterface } from '@/apis/userApi'

export const userStore = defineStore('user', {
    state: () => {
        return {
            info: null as null | InfoInterface
        }
    },
    actions: {
        async getUserInfo() {
            const res = await info()
            this.info = res.data
            return res.data
        }
    }
})
