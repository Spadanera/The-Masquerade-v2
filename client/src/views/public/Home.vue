<template>
  <v-layout wrap justify-space-around v-show="loaded">
    <v-flex xs12 sm6 md6 lg5 xl3 pa-3>
      <v-card>
        <v-img :src="require('@/assets/story-teller-card.png')" height="300px"></v-img>
        <v-card-title>Story Teller</v-card-title>
        <v-card-subtitle>Manage yuor chronicle an invite players</v-card-subtitle>
        <v-card-actions>
          <v-btn @click="login('story-teller')" color="primary">
            <img class="gbutton" src="../../assets/btn_google_light_normal_ios.svg" alt />
            Sing in with Google
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md6 lg5 xl3 pa-3>
      <v-card>
        <v-img :src="require('@/assets/player-card.jpg')" height="300px"></v-img>
        <v-card-title>Player</v-card-title>
        <v-card-subtitle>Create your characters and join chronicle</v-card-subtitle>
        <v-card-actions>
          <v-btn @click="login('player')" color="primary">
            <img class="gbutton" src="../../assets/btn_google_light_normal_ios.svg" alt />
            Sing in with Google
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import client from "../../services/client";
export default {
  methods: {
    login(role) {
      location.href = `/auth/google-role/${role}`;
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  async created() {
    try {
      let isLoggedIn = await client.get("/auth/checkauthentication");
      isLoggedIn = isLoggedIn.data;
      if (isLoggedIn) {
        this.$router.push(`/${isLoggedIn}`);
      } else {
        this.loaded = true;
      }
    } catch (error) {
      this.loaded = true;
    }
  }
};
</script>

<style>
.gbutton {
  width: 38px;
  margin-left: -9px;
  margin-top: -1px;
  margin-right: 5px;
}
</style>
