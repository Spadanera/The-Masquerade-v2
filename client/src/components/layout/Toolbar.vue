<template>
  <v-toolbar app fixed clipped-left color="primary" dark>
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      v-if="leftIconVisible()"
      @click="$emit('toggle-nav')"
    ></v-toolbar-side-icon>
    <img src="../../assets/vmplogo.png">
    <v-toolbar-title class="headline text-uppercase">
      <router-link :to="rootMenu" tag="span">
        <span class="hidden-sm-and-down">{{ title }}</span>
        <span class="hidden-md-and-up" v-if="!leftIconVisible()">{{ shortTitle }}</span>
      </router-link>

      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <h3 v-if="userMenu">{{ chronicleName }}</h3>
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
    }
  },
  async created() {
    this.getUser();
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
