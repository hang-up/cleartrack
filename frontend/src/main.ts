import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import BasePreset from "./assets/styles/BasePreset";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(PrimeVue, {
  unstyled: true,
  pt: BasePreset
}).use(router).mount('#app')
