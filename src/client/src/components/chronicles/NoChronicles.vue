<template>
  <v-layout row wrap>
    <AddChronicle :dialog="dialog" @close="dialog = false" />
    <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">No Chronicle created</div>
            <span class="grey--text">You have to create a Chronicle to start your story telling</span>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn @click="dialog=true">Create New Chronicle</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AddChronicle from "./AddChronicle.vue";
export default {
  name: "NoChronicles",
  components: {
    AddChronicle
  },
  data() {
    return {
      dialog: false
    }
  }
};
</script>

<style>
</style>
