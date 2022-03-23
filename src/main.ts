import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'animate.css';
import '@/assets/scss/tailwind.scss';
import '@/assets/scss/main.scss';

createApp(App).use(store).use(router).mount('#app');
