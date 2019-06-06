import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import('./views/Public.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/public/Home.vue')
        },
        {
          path: '/about',
          component: () => import('./views/public/About.vue')
        },
        {
          path: '/join/:token',
          component: () => import('./views/public/Join.vue')
        }
      ]
    },
    {
      path: '/story-teller',
      component: () => import('./views/StoryTeller.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/story-teller/ChroniclesList.vue')
        },
        {
          path: 'chronicle/:id',
          component: () => import('./views/shared/Chronicle.vue'),
          props: (route) => ({
            sections: [
              {
                tooltip: "Dashboard",
                icon: "dashboard",
                iconClass: "icon-dashboard",
                route: "dashboard"
              },
              {
                tooltip: "Stories",
                icon: "book",
                iconClass: "icon-stories",
                route: "stories"
              },
              {
                tooltip: "Players",
                icon: "account_circle",
                iconClass: "icon-players",
                route: "players"
              },
              {
                tooltip: "Coterie",
                icon: "people",
                iconClass: "icon-coterie",
                route: "coteries"
              },
              {
                tooltip: "Live Session",
                icon: "play_circle_outline",
                iconClass: "icon-play",
                route: "live"
              }
            ],
            chronicleService: require('./services/chronicles/story-teller').default
          }),
          children: [
            {
              path: "dashboard",
              component: () => import("./views/story-teller/chronicle/Dashboard.vue")
            },
            {
              path: "stories",
              component: () => import('./views/shared/chronicle/Stories.vue'),
              children: [
                {
                  path: ":storyid",
                  component: () => import("./views/shared/chronicle/Story.vue"),
                }
              ]
            },
            {
              path: "players",
              component: () => import('./views/story-teller/chronicle/Players.vue'),
              children: [
                {
                  path: ":playerid",
                  component: () => import('./views/story-teller/chronicle/Player.vue')
                }
              ]
            },
            {
              path: "coteries",
              component: () => import('./views/story-teller/chronicle/Coteries.vue'),
              children: [
                {
                  path: ":listid",
                  component: () => import('./views/shared/chronicle/CharactersList.vue'),
                  props: (route) => ({
                    listService: require('./services/coteries/characterList').default,
                    characterService: require('./services/coteries/character').default
                  })
                },
                {
                  path: ":listid/character/:characterid",
                  component: () => import('./views/shared/chronicle/Character.vue'),
                  props: (route) => ({
                    characterService: require('./services/coteries/character').default
                  })
                }
              ]
            },
            {
              path: "live",
              component: () => import('./views/story-teller/chronicle/Live.vue')
            }
          ]
        }
      ]
    },
    {
      path: "/player",
      component: () => import('./views/Player.vue'),
      children: [
        {
          path: "",
          component: () => import('./views/player/ChroniclesList.vue')
        },
        {
          path: 'chronicle/:id',
          component: () => import('./views/shared/Chronicle.vue'),
          props: (route) => ({
            sections: [
              {
                tooltip: "Characters",
                icon: "account_circle",
                iconClass: "icon-players",
                route: "characters"
              },
              {
                tooltip: "Dashboard",
                icon: "dashboard",
                iconClass: "icon-dashboard",
                route: "dashboard"
              },
              {
                tooltip: "Stories",
                icon: "book",
                iconClass: "icon-stories",
                route: "stories"
              }
            ],
            chronicleService: require('./services/chronicles/player').default
          }),
          children: [
            {
              path: "dashboard",
              component: () => import("./views/story-teller/chronicle/Dashboard.vue")
            },
            {
              path: "stories",
              component: () => import('./views/shared/chronicle/Stories.vue'),
              children: [
                {
                  path: ":storyid",
                  component: () => import("./views/shared/chronicle/Story.vue"),
                }
              ]
            },
            {
              path: "characters",
              component: () => import('./views/shared/chronicle/CharactersList.vue'),
              props: (route) => ({
                listService: require('./services/players/characterList').default,
                characterService: require('./services/players/character').default
              }),
              children: [
                {
                  path: ":characterid",
                  component: () => import('./views/shared/chronicle/Character.vue'),
                  props: (route) => ({
                    characterService: require('./services/players/character').default
                  })
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
