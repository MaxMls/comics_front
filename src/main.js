import axios from 'axios';
import bcrypt from 'bcryptjs';

import Vue from "vue";
Vue.prototype.$axios = axios;
Vue.prototype.$bcrypt = bcrypt;
Vue.prototype.$scrollToTop = () => window.scrollTo(0,0)

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from './i18n';
import VueObserveVisibility from 'vue-observe-visibility'
import './registerServiceWorker'

Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;
const app = new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
});

app.$mount("#myApp");

//const renderer = vsr.createRenderer()
