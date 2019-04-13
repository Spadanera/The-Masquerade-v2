<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer v-model="navVisible" mini-variant disable-route-watcher :fixed="this.$vuetify.breakpoint.mdAndDown">
      <v-list class="pt-0" dense>
        <v-list-tile v-for="section in this.sections" 
          v-bind:key="section.route"
          style="border-bottom: 1px solid lightgray; padding: 10px 0">
          <v-list-tile-action>
            <v-tooltip right v-bind:key="section.route">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-bind:class="{ selected: selected(section.route) }"
                  x-large              
                  @click="goTo(section.route)"
                  v-on="on"
                >{{ section.icon || section.iconFunction() }}</v-icon>
              </template>
              <span>{{ section.tooltip }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-flex style="height: 100%">
      <router-view @updated="loadChronicle" :navVisible="nav.visible"></router-view>
    </v-flex>
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
          route: "dashboard"
        },
        {
          tooltip: "Stories",
          icon: "book",
          route: "stories"
        },
        {
          tooltip: "Players",
          icon: "account_circle",
          route: "players"
        },
        {
          tooltip: "Coterie",
          icon: "people",
          route: "coteries"
        },
        {
          tooltip: "Live Session",
          iconFunction() {
            return "play_circle_outline";
          },
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
      this.$router.push(`/chronicle/${this.$route.params.id}/${route}`);
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
</style>
