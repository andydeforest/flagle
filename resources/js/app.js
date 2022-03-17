import { createApp, h } from 'vue'
import { store } from './store'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import 'animate.css'

createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(store)
            .mount(el)
    },
})
