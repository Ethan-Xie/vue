import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import ajax from './config/ajax'
import  './style/common'
import  './config/rem'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})
/*
new Vue({
    router,
    store,
}).$mount('#app')
*/
/* eslint-disable no-new   */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
