import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import persist from 'pinia-plugin-persistedstate'
import piniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
import './assets/variables.less';
const app = createApp(App);
pinia.use(piniaPluginPersist);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount('#app')
