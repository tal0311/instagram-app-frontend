import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import svgPlugin from './plugins/svgPlugin';
import errorPlugin from './plugins/errorPlugin';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/styles.scss';

const app = createApp(App)

app.use(ElementPlus)
app.use(errorPlugin)
app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
