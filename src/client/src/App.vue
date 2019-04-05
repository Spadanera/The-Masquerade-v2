<template>
  <v-app :dark="darkTheme" class="max-height">
    <Toolbar :dark-theme="darkTheme" @theme="toggleTheme" v-on:toggle-nav="toggleNav" title="vampire the masquerade" short-title="VTM" :chronicle-name="chronicleName" />
    <v-content class="damasco max-height">
      <router-view @chronicle="setChronicle" class="max-height" />
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
      chronicleName: "",
      darkTheme: false
    };
  },
  methods: {
    setLeftButtonVisible(visible) {
      this.leftBottonVisible = visible;
    },
    toggleNav() {},
    setChronicle(chronicleName) {
      this.chronicleName = chronicleName
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
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
