<template>
  <v-app>
    <Toolbar v-on:toggle-nav="toggleNav" title="vampire the masquerade" short-title="VTM" :chronicle-name="chronicleName" />
    <v-content class="damasco">
      <router-view @chronicle="setChronicle" />
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
      leftBottonVisible: false,
      chronicleName: ""
    };
  },
  methods: {
    setLeftButtonVisible(visible) {
      this.leftBottonVisible = visible;
    },
    toggleNav() {},
    setChronicle(chronicleName) {
      this.chronicleName = chronicleName
    }
  }
};
</script>

<style>
@import "~animate.css";
.damasco {
  background-image: url(assets/blood5.png);
  background-repeat: repeat-y;
  background-attachment: fixed;
  /*background-size: cover; */
  background-size: contain;
}
</style>
