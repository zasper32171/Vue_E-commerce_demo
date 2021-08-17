import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import { Form, Field, ErrorMessage } from '@/methods/vee-validate';
import VueLoading from '@/methods/loading-overlay';
import helpers from '@/methods/helpers';

import App from './App.vue';
import router from './router';

import '@/assets/scss/all.scss';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading, { loader: 'bars', zIndex: 2000, lockScroll: false });
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.config.globalProperties.$helper = { ...helpers };
app.mount('#app');
