import vue from '@vitejs/plugin-vue'
import { Plugin } from 'vite'
import setupMockPlugin from './mock'
import autoImport from './autoImport'

// 插件管理（vite）
export default function setupPlugins(isBuild: boolean, env: ViteEnv): Plugin[] {
    const plugins: Plugin[] = [vue()]

    // 导入mock插件
    plugins.push(setupMockPlugin(isBuild))

    // 自动导入
    autoImport(plugins)

    return plugins
}
