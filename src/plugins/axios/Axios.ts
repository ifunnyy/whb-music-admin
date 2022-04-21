import router from '@/router'
import axios, { AxiosRequestConfig } from 'axios'
import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'

export default class Axios {
    private instance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors()
    }

    // get 请求
    public get<T, D = ResponseResult<T>>(uri: string): Promise<D> {
        return this.requect<T, D>({
            url: uri,
            method: 'get'
        })
    }

    // post 请求
    public post<T, D = ResponseResult<T>>(uri: string, data: any): Promise<D> {
        return this.requect<T, D>({
            url: uri,
            method: 'post',
            data
        })
    }

    // 发送请求
    protected requect<T, D = ResponseResult<T>>(
        config: AxiosRequestConfig
    ): Promise<D> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    // 拦截器
    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    // 请求拦截器
    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            config => {
                // 添加 token
                if (store.get(CacheEnum.TOKEN_NAME)) {
                    const token = store.get(CacheEnum.TOKEN_NAME)
                    config.headers = {
                        ...config.headers,
                        ...{
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
                return config
            },
            error => {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )
    }
    // 响应拦截器
    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            response => {
                return response
            },
            error => {
                // 401 直接去登录界面
                if (error.response.status === 401) {
                    router.push({ name: 'login' })
                    return
                }
                if (error.response.data) {
                    return Promise.resolve(error.response)
                }

                return Promise.reject(error)
            }
        )
    }
}
