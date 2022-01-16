import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import router from './router'
import App from './App.vue'
import Vuetify from 'vuetify'



Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
