import Vue from 'vue';
import Router from 'vue-router';
import RestService from './services/rest/rest-services';

// Component
import Public from './views/Public.vue';
import Home from './views/public/Home.vue';
import About from './views/public/About.vue';
import Join from './views/public/Join.vue';
import StoryTeller from './views/StoryTeller.vue';
import ChroniclesList from './views/story-teller/ChroniclesList.vue';
import Chronicle from './views/shared/Chronicle.vue';
import Dashboard from './views/story-teller/chronicle/Dashboard.vue';
import Stories from './views/shared/chronicle/Stories.vue';
import Story from './views/shared/chronicle/Story.vue';
import Players from './views/story-teller/chronicle/Players.vue';
import CharacterList from './views/shared/chronicle/CharactersList.vue';
import Character from './views/shared/chronicle/Character.vue';
import Coteries from './views/story-teller/chronicle/Coteries.vue';
import Live from './views/story-teller/chronicle/Live.vue';
import Player from './views/Player.vue';
import PlayerChroniclesList from './views/player/ChroniclesList.vue';
import Attachments from './views/shared/chronicle/Attachments';
import Places from './views/shared/chronicle/Places';

Vue.use(Router);

let Service;

// if (process.env.VUE_APP_API === "graphql") {

// }
// else {
Service = RestService;
// }

export default new Router({
  routes: [
    {
      path: "/",      
      component: Public,
      children: [
        {
          path: '/',
          name: "home",
          component: Home,
          props: true
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/join/:token',
          component: Join
        }
      ]
    },
    {
      path: '/story-teller',
      component: StoryTeller,
      children: [
        {
          path: '',
          component: ChroniclesList
        },
        {
          path: 'chronicle/:id',
          component: Chronicle,
          props: () => ({
            sections: [
              {
                tooltip: "dashboard",
                icon: "dashboard",
                iconClass: "icon-dashboard",
                route: "dashboard"
              },
              {
                tooltip: "stories",
                icon: "book",
                iconClass: "icon-stories",
                route: "stories"
              },
              {
                tooltip: "players",
                icon: "account_circle",
                iconClass: "icon-players",
                route: "players"
              },
              {
                tooltip: "coterie",
                icon: "people",
                iconClass: "icon-coterie",
                route: "coteries"
              },
              {
                tooltip: "attachments",
                icon: "",
                iconClass: "icon-attachment",
                route: "attachments"
              },
              {
                tooltip: "places",
                icon: "",
                iconClass: "icon-places",
                route: "places"
              },
              {
                tooltip: "session",
                icon: "play_circle_outline",
                iconClass: "icon-live",
                route: "live"
              }
            ],
            chronicleService: Service.chronicleService,
            sessionService: Service.sessionService
          }),
          children: [
            {
              path: "dashboard",
              component: Dashboard,
              props: () => ({
                sessionService: Service.sessionService,
                storyService: Service.storyService
              })
            },
            {
              path: "stories",
              component: Stories,
              props: () => ({
                storyService: Service.storyService
              }),
              children: [
                {
                  path: ":storyid",
                  component: Story,
                  props: () => ({
                    storyService: Service.storyService,
                    sessionService: Service.sessionService,
                  })
                }
              ]
            },
            {
              path: "players",
              component: Players,
              children: [
                {
                  path: ":listid",
                  component: CharacterList,
                  props: () => ({
                    groupService: Service.playerService,
                    edit: true,
                    player: true
                  })
                },
                {
                  path: ":listid/character/:characterid",
                  component: Character,
                  props: () => ({
                    groupService: Service.playerService,
                    edit: true,
                    isPlayer: true
                  })
                }
              ]
            },
            {
              path: "coteries",
              component: Coteries,
              children: [
                {
                  path: ":listid",
                  component: CharacterList,
                  props: () => ({
                    groupService: Service.coterieService,
                    edit: true
                  })
                },
                {
                  path: ":listid/character/:characterid",
                  component: Character,
                  props: () => ({
                    groupService: Service.coterieService,
                    edit: true
                  })
                }
              ]
            },
            {
              path: "live",
              component: Live
            },
            {
              path: "attachments",
              component: Attachments,
              props: () => ({
                attachmentService: Service.attachmentService,
                isStoryTeller: true
              })
            },
            {
              path: "places",
              component: Places,
              props: () => ({
                placeService: Service.placeService,
                isStoryTeller: true
              })
            }
          ]
        }
      ]
    },
    {
      path: "/player",
      component: Player,
      children: [
        {
          path: "",
          component: PlayerChroniclesList
        },
        {
          path: 'chronicle/:id',
          component: Chronicle,
          props: () => ({
            sections: [
              {
                tooltip: "characters",
                icon: "account_circle",
                iconClass: "icon-players",
                route: "characters"
              },
              {
                tooltip: "dashboard",
                icon: "dashboard",
                iconClass: "icon-dashboard",
                route: "dashboard"
              },
              {
                tooltip: "stories",
                icon: "book",
                iconClass: "icon-stories",
                route: "stories"
              },
              {
                tooltip: "attachments",
                icon: "",
                iconClass: "icon-attachment",
                route: "attachments"
              },
              {
                tooltip: "places",
                icon: "",
                iconClass: "icon-places",
                route: "places"
              }
            ],
            chronicleService: Service.dedicatedPlayerService.chronicleService,
            sessionService: Service.dedicatedPlayerService.sessionService,
            isPlayer: true
          }),
          children: [
            {
              path: "dashboard",
              component: Dashboard,
              props: () => ({
                isPlayer: true,
                sessionService: Service.dedicatedPlayerService.sessionService,
                storyService: Service.dedicatedPlayerService.storyService
              })
            },
            {
              path: "stories",
              component: Stories,
              props: () => ({
                storyService: Service.dedicatedPlayerService.storyService,
                isPlayer: true
              }),
              children: [
                {
                  path: ":storyid",
                  component: Story,
                  props: () => ({
                    storyService: Service.dedicatedPlayerService.storyService,
                    sessionService: Service.dedicatedPlayerService.sessionService,
                    isPlayer: true
                  })
                }
              ]
            },
            {
              path: "characters",
              component: CharacterList,
              props: () => ({
                groupService: Service.dedicatedPlayerService.playerService,
                edit: true,
                player: true
              })
            },
            {
              path: "characters/:characterid",
              component: Character,
              props: () => ({
                groupService: Service.dedicatedPlayerService.playerService,
                edit: true,
                isPlayer: true
              })
            },
            {
              path: "attachments",
              component: Attachments,
              props: () => ({
                attachmentService: Service.dedicatedPlayerService.attachmentService,
                isStoryTeller: false
              })
            },
            {
              path: "places",
              component: Places,
              props: () => ({
                placeService: Service.dedicatedPlayerService.placeService,
                isStoryTeller: false
              })
            }
          ]
        }
      ]
    }
  ]
});