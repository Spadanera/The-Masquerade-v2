import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/configurations',
      name: 'configurations',
      component: () => import('./views/story-teller/Configurations.vue')
    },
    {
      path: '/story',
      name: 'story',
      component: () => import('./views/story-teller/stories/Dashboard.vue')
    }
  ]
})
