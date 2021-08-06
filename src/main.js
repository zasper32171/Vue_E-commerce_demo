import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import { Form, Field, ErrorMessage } from '@/methods/vee-validate';
import { useLoading } from '@/methods/loading-overlay';
import helpers from '@/methods/helpers';

import App from './App.vue';
import router from './router';

import '@/styles/all.scss';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.config.globalProperties.$loading = useLoading({ loader: 'bars', zIndex: 2000 });
app.config.globalProperties.$helper = { ...helpers };
app.mount('#app');
