<template>
  <v-app>
    <Toolbar v-on:toggle-nav="toggleNav" title="vue test"/>
    <v-content class="damasco">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/layout/Toolbar.vue";

export default {
  name: "App",
  components: {
    Toolbar
  },
  data() {
    return {
      leftBottonVisible: false
    };
  },
  methods: {
    setLeftButtonVisible(visible) {
      leftBottonVisible = visible;
    },
    toggleNav() {}
  }
};
</script>

<style>
  .damasco {
    background-image: url(assets/damasco.jpg);
    background-repeat: repeat-y;
    background-attachment: fixed;
    background-size: cover;
  }
</style>
