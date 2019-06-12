<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="navVisible"
      mini-variant
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      style="min-width: 80px"
      stateless
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
    <router-view style="height: 100%" @updated="loadChronicle" :navVisible="navVisible" @closenavbar="closeNavBar"></router-view>
  </v-layout>
</template>

<script>
import client from "../../services/client";
export default {
  props: {
    nav: Object,
    sections: Array,
    chronicleService: Object
  },
  data() {
    return {
      chronicle: {},
      liveSession: false
    };
  },
  methods: {
    async loadChronicle() {
      let response = await this.chronicleService.load(this);
      this.chronicle = response.data;
      this.$emit("chronicle", this.chronicle.name);
    },
    goTo(route) {
        this.chronicleService.goTo(route, this)
    },
    selected(route) {
      return this.$route.path.indexOf(route) > -1;
    },
    closeNavBar() {
      this.navVisible = false;
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
