import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { MNotificationPlugin, MDialogPlugin } from "../lib";
import ApiPlugin from './plugins/api';

import './index.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ApiPlugin);
app.use(MNotificationPlugin);
app.use(MDialogPlugin);

app.mount('#app')
