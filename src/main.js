import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import svgPlugin from './svgPlugin';

import './assets/styles/styles.scss';

const app = createApp(App)

app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
