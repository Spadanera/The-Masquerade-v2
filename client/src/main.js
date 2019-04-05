import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import moment from 'moment'
import colors from 'vuetify/es5/util/colors'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.red.darken4,
    secondary: '#b0bec5',
    accent: 'white',
    error: '#b71c1c'
  }
});

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Accept',
  buttonFalseText: 'Discard',
  color: 'primary',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm'
})

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
