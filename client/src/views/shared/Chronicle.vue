<template>
  <v-layout align-start justify-start fill-height style="overflow-y: auto;">
    <v-navigation-drawer
      v-model="navVisible"
      mini-variant
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      style="min-width: 80px; z-index: 5 !important"
      stateless
    >
      <v-list class="pt-0" dense>
        <v-list-item
          v-for="section in this.sections"
          v-bind:key="section.route"
          style="border-bottom: 1px solid darkgrey; padding: 10px 0"
        >
          <v-list-item-action>
            <v-tooltip right v-bind:key="section.route">
              <template v-slot:activator="{ on }">
                <v-icon
                  x-large
                  @click="goTo(section.route)"
                  v-on="on"
                  v-bind:class="[section.iconClass, selected(section.route) ? 'selected' : '']"
                ></v-icon>
              </template>
              <span>{{ $ml.get(section.tooltip) }}</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div
      class="layer"
      v-if="navVisible && this.$vuetify.breakpoint.mdAndDown"
      @click="navVisible = false"
    ></div>
    <transition name="fade" mode="out-in">
      <router-view
        style="height: 100%"
        @updated="loadChronicle"
        :navVisible="navVisible"
        @closenavbar="closeNavBar"
        :sessionOnGoing="sessionOnGoing"
        :gmaps="chronicle.gmaps"
        :loaded="loaded"
      ></router-view>
    </transition>
    <v-snackbar v-model="showSnackbar" :timeout="0">
      {{ $ml.get("sessionOnGoing") }}
      <v-btn color="primary" text @click="showSession()">{{$ml.get("open")}}</v-btn>
    </v-snackbar>
    <v-bottom-sheet v-model="sheet" persistent>
      <SessionForm
        :readonly="false"
        :sessionid="onGoingSession._id"
        @close="sheet=false"
        @complete="sessionCompleted"
        :sessionService="sessionService"
        :isPlayer="isPlayer"
        :search="[]"
      />
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import SessionForm from "../../components/live/SessionForm";
export default {
  components: {
    SessionForm
  },
  props: {
    nav: Object,
    sections: Array,
    chronicleService: Object,
    sessionService: Object,
    isPlayer: Boolean
  },
  data() {
    return {
      chronicle: {},
      sessionOnGoing: false,
      onGoingSession: {},
      loaded: false,
      sheet: false
    };
  },
  methods: {
    async loadChronicle() {
      this.chronicle = await this.chronicleService.getChronicle(
        this.$route.params.id
      );
      this.$emit("chronicle", this.chronicle.name);
      window.setTimeout(() => (this.loaded = true), 300);
    },
    goTo(route) {
      this.chronicleService.goTo(route, this);
    },
    selected(route) {
      return this.$route.path.indexOf(route) > -1;
    },
    closeNavBar() {
      this.navVisible = false;
    },
    sessionCompleted() {
      this.onGoingSession = {};
      this.sessionOnGoing = false;
      this.sheet = false;
    },
    showSession() {
      this.sheet = true;
    },
    async getOngoingSession() {
      this.onGoingSession =
        (await this.sessionService.getOnGoingSession(this.$route.params.id)) ||
        {};
      if (this.onGoingSession.sessionDate) {
        this.sessionOnGoing = true;
      } else {
        this.sessionOnGoing = false;
      }
    }
  },
  created() {
    this.loadChronicle();
    this.getOngoingSession();
  },
  computed: {
    navVisible: {
      get() {
        return this.nav.visible || this.$vuetify.breakpoint.lgAndUp;
      },
      set(val) {
        this.nav.visible = val;
      }
    },
    showSnackbar: {
      get() {
        return this.sessionOnGoing && this.$route.fullPath.indexOf('live') < 0 && !this.sheet;
      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.$route.params.id) {
      this.getOngoingSession();
    }
    next();
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

@media screen and (min-width: 1265px) {
  #sessions {
    height: 100%;
  }

  #sessions > .v-card {
    height: 100%;
  }

  #sessions > .v-card > .v-card__text {
    max-height: calc(100% - 110px);
    overflow-y: auto;
  }
}
.v-timeline-item__dot {
  z-index: 0 !important;
}

.left-alert {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 380px;
  margin-bottom: 0px;
  z-index: 10;
  cursor: pointer;
}
</style>
