<template>
  <v-toolbar app fixed clipped-left color="indigo" dark>
    <v-toolbar-side-icon
      v-if="leftBottonVisible"
      class="hidden-lg-and-up"
      @click="$emit('toggle-nav')"
    ></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" tag="span">{{ title }}</router-link>
      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-btn to="/story" flat>
      <span class="mr-2">Story Telling</span>
    </v-btn>
    <v-btn to="/configurations" flat>
      <span class="mr-2">Configuration</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    title: String,
    leftBottonVisible: Boolean
  }
};
</script>

<style>
.v-toolbar__title {
  cursor: pointer;
}
</style>
