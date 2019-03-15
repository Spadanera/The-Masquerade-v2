<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">No Story created</div>
            <span class="grey--text">You have to create a story to start your story telling</span>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn>Create New Story</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NoStories"
};
</script>

<style>
</style>
