import { App } from 'vue'
import { Quasar } from 'quasar'



export default function setupQuasar(app: App) {
    app.use(Quasar, {
        plugins: {}
    })
}