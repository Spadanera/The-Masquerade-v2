import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import moment from 'moment'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
