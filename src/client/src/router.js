import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/chronicles',
      name: 'chronicles',
      component: () => import('./views/story-teller/chronicles/List.vue')
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
