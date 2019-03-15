<template>
  <v-form rel="form" v-model="valid">
    <v-text-field v-model="story.name" label="Name"></v-text-field>
    <v-textarea v-model="story.description" label="Description" name="description" auto-grow rows="1"></v-textarea>
  </v-form>
</template>

<script>
export default {
  name: "StoryForm",
  data() {
    return {
      valid: true,
      story: {}
    };
  }
};
</script>

<style>
</style>
