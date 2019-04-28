<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="navVisible"
      mini-variant
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      style="min-width: 80px"
    >
      <v-list class="pt-0" dense>
        <v-list-tile
          v-for="section in this.sections"
          v-bind:key="section.route"
          style="border-bottom: 1px solid darkgrey; padding: 10px 0"
        >
          <v-list-tile-action>
            <v-tooltip right v-bind:key="section.route">
              <template v-slot:activator="{ on }">
                <v-icon
                  x-large
                  @click="goTo(section.route)"
                  v-on="on"
                  v-bind:class="[section.iconClass, selected(section.route) ? 'selected' : '']"
                ></v-icon>
              </template>
              <span>{{ section.tooltip }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view style="height: 100%" @updated="loadChronicle" :navVisible="navVisible"></router-view>
  </v-layout>
</template>

<script>
import client from "../../services/client";
export default {
  props: {
    nav: Object
  },
  data() {
    return {
      chronicle: {},
      liveSession: false,
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
      ]
    };
  },
  methods: {
    async loadChronicle() {
      let response = await client.get(
        `/api/chronicles/${this.$route.params.id}`
      );
      this.chronicle = response.data;
      this.$emit("chronicle", this.chronicle.name);
    },
    goTo(route) {
        this.$router.push(`/story-teller/chronicle/${this.$route.params.id}/${route}`);
        if (route === "dashboard") {
          this.nav.visible = false;
        }
    },
    selected(route) {
      return this.$route.path.indexOf(route) > -1;
    }
  },
  created() {
    this.loadChronicle();
  },
  computed: {
    navVisible: {
      get() {
        return this.nav.visible || this.$vuetify.breakpoint.lgAndUp;
      },
      set(val) {
        this.nav.visible = val;
      }
    }
  }
};
</script>

<style>
.selected {
  color: #b71c1c !important;
}

.left-modified.v-navigation-drawer--open {
  left: 80px;
}

.selected-element {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  right: 0;
}
</style>
