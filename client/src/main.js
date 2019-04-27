import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import moment from 'moment'
import colors from 'vuetify/es5/util/colors'
import VuetifyConfirm from 'vuetify-confirm';
import { clans } from './config/enum';
import { generations } from './config/enum';
import {disciplines } from './config/enum';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.red.darken4,
    secondary: '#b0bec5',
    accent: '#FFFAFA',
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
  data() {
    return {
      clans: clans,
      generations: generations,
      disciplines: disciplines
    }
  },
  render: h => h(App)
}).$mount('#app')
