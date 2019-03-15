<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="error" dark v-on="on" fixed bottom right fab>
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create New Story</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <StoryForm />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Dismiss</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import StoryForm from './StoryForm.vue'
export default {
    name: 'AddStory',
    components: {
        StoryForm
    },
    data() {
        return {
            dialog: false,
            story: {}
        }
    }
};
</script>

<style>
</style>
