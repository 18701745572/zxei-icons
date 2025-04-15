import { createApp } from 'vue';
import App from './App.vue';
import ZxeiIcons from 'zxei-icons';

const app = createApp(App);

// 全局注册所有图标组件
app.use(ZxeiIcons);

app.mount('#app'); 