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
      component: () => import('./views/story-teller/ChroniclesList.vue')
    },
    {
      path: '/chronicle/:id',
      name: 'chronicle',
      component: () => import('./views/story-teller/Chronicle.vue'),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("./views/story-teller/chronicle/Dashboard.vue")
        },
        {
          path: "stories",
          name: "stories",
          component: () => import('./views/story-teller/chronicle/Stories.vue')
        },
        {
          path: "players",
          name: "players",
          component: () => import('./views/story-teller/chronicle/Players.vue')
        },
        {
          path: "coteries",
          name: "coteries",
          component: () => import('./views/story-teller/chronicle/Coteries.vue')
        },
        {
          path: "live",
          name: "live",
          component: () => import('./views/story-teller/chronicle/Live.vue')
        }
      ]
    }
  ]
})
