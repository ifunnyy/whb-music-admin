import Axios from './Axios'
import utils from '@/utils'

const http = new Axios({
    baseURL: utils.env.VITE_API_HOST + utils.env.VITE_API_URL,
    timeout: 10000,
    headers: {}
})

export { http }
