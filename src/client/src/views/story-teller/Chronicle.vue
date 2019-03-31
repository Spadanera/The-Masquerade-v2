<template>
  <v-layout align-start justify-start fill-height>
    <v-flex shrink style="height: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
      <v-layout align-start justify-start column>
        <v-tooltip right v-for="section in this.sections" v-bind:key="section.route">
          <template v-slot:activator="{ on }">
            <v-icon
              v-bind:class="{ selected: selected(section.route) }"
              x-large
              style="padding: 10px; cursor: pointer; border-bottom: 1px solid lightgray"
              v-on="on"
              @click="goTo(section.route)"
            >{{ section.icon || section.iconFunction()  }}</v-icon>
          </template>
          <span>{{ section.tooltip }}</span>
        </v-tooltip>
      </v-layout>
    </v-flex>
    <v-flex style="height: 100%">
      <router-view @updated="loadChronicle"></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
import client from "../../services/client";
export default {
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
          icon: "chrome_reader_mode",
          route: "stories"
        },
        {
          tooltip: "Players",
          icon: "face",
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
      let response = await client.get(`/api/chronicles/${this.$route.params.id}`);
      this.chronicle = response.data;
      this.$emit("chronicle", this.chronicle.name);
    },
    goTo(route) {
      this.$router.push(`/chronicle/${this.$route.params.id}/${route}`);
    },
    selected(route) {
      return route === this.$route.name;
    }
  },
  created() {
    this.loadChronicle();
  }
};
</script>

<style>
.selected {
  color: #b71c1c !important;
}
</style>
