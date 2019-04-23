<template>
  <v-layout wrap justify-space-around>
    <v-flex xs12 sm8 md6 lg4 x3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ chronicle.name }}</div>
            <span
              class="grey--text"
            >{{ moment(chronicle.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</span>
          </div>
        </v-card-title>
        <v-card-text style="flex: 1">{{ chronicle.shortDescription }}</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="join">Join the chronicle</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import client from "../services/client";
export default {
  methods: {
    join() {
      location.href = `/auth/google-join/${this.$route.params.token}`;
    },
    async getChronicle() {
      let response = await client.get(
        `/api/invitations/chronicle/${this.$route.params.token}`
      );
      this.chronicle = response.data;
    }
  },
  data() {
    return {
      chronicle: {}
    };
  },
  created() {
    this.getChronicle();
  }
};
</script>

<style>
</style>
