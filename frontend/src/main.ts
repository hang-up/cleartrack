import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import BaseAuraPreset from '@/assets/styles/base-aura-preset'
import 'frappe-gantt/dist/frappe-gantt.min.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app
  .use(createPinia())
  .use(PrimeVue, {
    unstyled: true,
    pt: BaseAuraPreset
  })
  .directive('tooltip', Tooltip)
  .use(ToastService)
  .use(router)
  .mount('#app')
