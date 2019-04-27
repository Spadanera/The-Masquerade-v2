import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "public",
      component: () => import('./views/Public.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/public/Home.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/public/About.vue')
        },
        {
          path: '/join/:token',
          name: 'join',
          component: () => import('./views/public/Join.vue')
        }
      ]
    },
    {
      path: '/story-teller',
      name: 'story-teller',
      component: () => import('./views/StoryTeller.vue'),
      children: [
        {
          path: '',
          name: 'chronicles',
          component: () => import('./views/story-teller/ChroniclesList.vue')
        },
        {
          path: 'chronicle/:id',
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
                  component: () => import('./views/story-teller/chronicle/Character.vue')
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
    }
  ]
})
