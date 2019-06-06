<template>
  <v-toolbar app fixed clipped-left color="primary" dark>
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      v-if="leftIconVisible()"
      @click="$emit('toggle-nav')"
    ></v-toolbar-side-icon>
    <router-link :to="rootMenu" tag="span" style="cursor: pointer">
      <img src="../../assets/vmplogo.png">
    </router-link>
    <v-toolbar-title class="headline text-uppercase">
      <router-link :to="rootMenu" tag="span">
        <span class="hidden-sm-and-down">{{ title }}</span>
        <span class="hidden-md-and-up" v-if="!leftIconVisible()">{{ shortTitle }}</span>
      </router-link>

      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <h3 class="text-truncate" v-if="userMenu">{{ chronicleName }}</h3>
    <v-menu v-if="userMenu">
      <template v-slot:activator="{ on }">
        <v-btn fab icon v-on="on">
          <v-avatar size="40px">
            <img :src="user.picture" :alt="user.displayName">
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <!-- <v-list-tile>
            <v-list-tile-content>
              Settings
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>settings</v-icon>        
            </v-list-tile-action>
          </v-list-tile>-->
          <v-list-tile @click="toggleDarkTheme">
            <v-list-tile-content>Toggle dark theme</v-list-tile-content>
            <v-list-tile-action>
              <v-icon v-if="!darkTheme">toggle_off</v-icon>
              <v-icon v-else>toggle_on</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="toggleFullScreen">
            <v-list-tile-content>Full screen</v-list-tile-content>
            <v-list-tile-action>
              <v-icon v-if="!fullscreen">fullscreen</v-icon>
              <v-icon v-else>toggle_on</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>Exit</v-list-tile-content>
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script>
import client from "../../services/client";
export default {
  name: "Toolbar",
  props: {
    title: String,
    shortTitle: String,
    chronicleName: String,
    darkTheme: Boolean,
    userMenu: Boolean,
    rootMenu: String
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    logout() {
      location.href = "/auth/logout";
    },
    toggleDarkTheme() {
      this.$emit("theme");
    },
    leftIconVisible() {
      return this.$route.fullPath.indexOf("/chronicle/") > -1;
    },
    async getUser() {
      if (this.userMenu) {
        let response = await client.get("/api/user");
        this.user = response.data;
      }
    },
    toggleFullScreen() {
      if (this.fullscreen) {
        this.GoOutFullscreen();
      } else {
        this.GoInFullscreen();
      }
    },
    GoInFullscreen() {
      let element = document.querySelector("#app");
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
    },
    GoOutFullscreen() {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  },
  async created() {
    this.getUser();
  },
  computed: {
    fullscreen: {
      get() {
        let full_screen_element =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          null;
        // If no element is in full-screen
        if (full_screen_element === null) return false;
        else return true;
      }
    }
  }
};
</script>

<style>
.v-toolbar__title {
  cursor: pointer;
}
img {
  width: 45px;
}
</style>
