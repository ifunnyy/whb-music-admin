import { viteMockServe } from 'vite-plugin-mock'

// 测试数据
export default function setupMockPlugin(isBuild: boolean) {
    return viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: !isBuild
    })
}
