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
      path: '/join/:token',
      name: 'join',
      component: () => import('./views/Join.vue')
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
          component: () => import('./views/story-teller/chronicle/Stories.vue'),
          children: [
            {
              path: ":storyid",
              name: "story",
              component: () => import("./views/story-teller/chronicle/Story.vue"),
            }
          ]
        },
        {
          path: "players",
          name: "players",
          component: () => import('./views/story-teller/chronicle/Players.vue'),
          children: [
            {
              path: ":playerid",
              name: "player",
              component: () => import('./views/story-teller/chronicle/Player.vue')
            }
          ]
        },
        {
          path: "coteries",
          name: "coteries",
          component: () => import('./views/story-teller/chronicle/Coteries.vue'),
          children: [
            {
              path: ":conterieid",
              name: "coterieslist",
              component: () => import('./views/story-teller/chronicle/CharactersList.vue'),
            },
            {
              path: ":conterieid/character/:characterid",
              name: "character",
              component: () => import('./components/characters/Sheet.vue')
            }
          ]
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
