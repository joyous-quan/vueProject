import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueRouter from 'vue-router'
import { routes } from './router.config.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'

Vue.use(iView);

Vue.use(VueAxios, axios)

Vue.use(VueRouter);
const router = new VueRouter({
    routes
})
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})