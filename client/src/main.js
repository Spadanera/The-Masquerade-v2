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
      clans: [
        "Bruja",
        "Gangrel",
        "Malkavian",
        "Nosferatu",
        "Toreador",
        "Tremere",
        "Ventrue",
        "Caitiff"
      ],
      generations: [
        "14th",
        "13th",
        "12th",
        "11th",
        "10th",
        "9th",
        "8th",
        "7th",
        "6th",
        "5th",
        "4th",
        "3rd",
        "2nd",
        "1st"
      ]
    }
  },
  render: h => h(App)
}).$mount('#app')
