<template>
  <v-toolbar app fixed clipped-left color="primary" dark>
    <v-toolbar-side-icon
      v-if="leftBottonVisible"
      class="hidden-lg-and-up"
      @click="$emit('toggle-nav')"
    ></v-toolbar-side-icon>
    <img src="../../assets/vmplogo.png">
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/chronicles" tag="span">
        <span class="hidden-sm-and-down">{{ title }}</span>
        <span class="hidden-md-and-up">{{ shortTitle }}</span>
      </router-link>

      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <h2>
      {{ chronicleName }}
    </h2>
    <v-menu>
      <template v-slot:activator="{ on }" v-if="user">
        <v-btn fab icon v-on="on">
          <v-avatar size="40px">
            <img :src="user.picture" :alt="user.displayName">
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              Settings
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>settings</v-icon>        
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              Exit
            </v-list-tile-content>
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
    leftBottonVisible: Boolean,
    chronicleName: String
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    logout() {
      location.href = "http://localhost:3000/auth/logout";
    }
  },
  async created() {
    let response = await client.get("/api/user");
    this.user = response.data;
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
