<template>
  <v-layout wrap justify-space-around>
    <v-flex xs12 sm8 md6 lg4 x3>
      <v-card>
        <v-btn @click="login">Login with Google</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    login() {
      location.href = "http://localhost/auth/google";
    }
  }
};
</script>

<style>
</style>
