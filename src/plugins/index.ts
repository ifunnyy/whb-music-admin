import { App } from 'vue'
import setupPinia from './pinia'
import setupQuasar from './quasar'
import { setupTailwindcss } from './tailwindcss'
// 插件管理（vue）
export function setupPlugins(app: App) {
    setupPinia(app)
    setupQuasar(app)
    setupTailwindcss()
}
