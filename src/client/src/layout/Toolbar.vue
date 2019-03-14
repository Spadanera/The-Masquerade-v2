<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon class="hidden-lg-and-up" @click="$emit('toggle-nav')"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span>{{ title }}</span>
      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
      <span class="mr-2">Latest Release</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    title: String
  }
};
</script>

