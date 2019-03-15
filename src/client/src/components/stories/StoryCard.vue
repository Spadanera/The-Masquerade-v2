<template>
  <v-card style="display: flex; flex-direction: column; height: 100%">
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ story.name }}</div>
        <span class="grey--text">{{ moment(story.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</span>
      </div>
    </v-card-title>
    <v-card-text style="flex: 1">{{ story.description }}</v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="indigo" dark>Open</v-btn>
      <v-btn color="error">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "StoryCard",
  props: {
    story: Object
  }
};
</script>

<style>
</style>
