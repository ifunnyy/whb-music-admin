import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/api/data/list',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'success',
                result: true,
                data: {
                    message: 'success',
                    data: {
                        name: Random.cword(3, 5)
                    }
                }
            }
        }
    }
] as MockMethod[]
