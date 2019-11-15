<template>
  <v-layout wrap justify-space-around v-show="loaded">
    <v-flex xs12 sm8 md6 lg4 x3>
      <v-card>
        <v-btn @click="login('story-teller')">Login as Story Teller</v-btn>
      </v-card>
    </v-flex>
    <v-flex xs12 sm8 md6 lg4 x3>
      <v-card>
        <v-btn @click="login('player')">Login as Player</v-btn>
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
</style>
