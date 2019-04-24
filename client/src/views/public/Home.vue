<template>
  <v-layout wrap justify-space-around>
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
export default {
  methods: {
    login(role) {
      location.href = `/auth/google-role/${role}`;
    }
  }
};
</script>

<style>
</style>
