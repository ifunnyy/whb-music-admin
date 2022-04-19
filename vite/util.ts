import _ from 'lodash'

export function parseEnv(env: Record<string, string>): ViteEnv {
    // 深拷贝
    const envs: any = _.cloneDeep(env)
    Object.entries(envs).forEach(([key, value]) => {
        if (value == 'true') envs[key] = true
        if (value == 'false') envs[key] = false
        if (/^\d+$/.test(String(value))) envs[key] = Number(value)
        if (value == 'null') envs[key] = null
        if (value == 'undefined') envs[key] = undefined
    })

    return envs
}
