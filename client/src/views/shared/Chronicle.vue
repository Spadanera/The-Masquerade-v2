<template>
  <v-layout align-start justify-start fill-height style="overflow: auto;">
    <v-navigation-drawer
      v-model="navVisible"
      mini-variant
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      style="min-width: 80px; z-index: 4 !important"
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
    <div
      class="layer"
      v-if="navVisible && this.$vuetify.breakpoint.mdAndDown"
      @click="navVisible = false"
    ></div>
    <router-view
      style="height: 100%"
      @updated="loadChronicle"
      :navVisible="navVisible"
      @closenavbar="closeNavBar"
      :sessionOnGoing="sessionOnGoing"
    ></router-view>
    <v-alert
      v-if="$route.fullPath.indexOf('live') < 0"
      style="position: absolute;
    bottom: 0px;
    left: 0px;
    width: 380px;
    margin-bottom: 0px;
    z-index: 10;"
      :value="sessionOnGoing && navVisible"
      color="primary"
      icon="priority_high"
      transition="scale-transition"
    >Session on going</v-alert>
  </v-layout>
</template>

<script>
export default {
  props: {
    nav: Object,
    sections: Array,
    chronicleService: Object
  },
  data() {
    return {
      chronicle: {},
      sessionOnGoing: false
    };
  },
  methods: {
    async loadChronicle() {
      this.chronicle = await this.chronicleService.getChronicle(
        this.$route.params.id
      );
      this.$emit("chronicle", this.chronicle.name);
    },
    goTo(route) {
      this.chronicleService.goTo(route, this);
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
    window.setInterval(async () => {
      if (this.$route.params.id) {
        this.onGoingSession =
          (await this.Service.sessionService.getOnGoingSession(
            this.$route.params.id
          )) || {};
        if (this.onGoingSession.sessionDate) {
          this.sessionOnGoing = true;
        } else {
          this.sessionOnGoing = false;
        }
      }
    }, 1000);
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
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  left: 0;
}

.layer {
  position: absolute;
  height: calc(100% + 64px);
  width: 100%;
  top: -64px;
  background-color: lightgray;
  opacity: 0.5;
  z-index: 3;
}
</style>
