<template>
  <v-app :dark="darkTheme" class="max-height">
    <Toolbar :dark-theme="darkTheme" @theme="toggleTheme" v-on:toggle-nav="toggleNav" title="vampire the masquerade" short-title="VTM" :chronicle-name="chronicleName" />
    <v-content class="damasco max-height">
      <router-view @chronicle="setChronicle" class="max-height" :navVisible="navVisible" />
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
      chronicleName: "",
      darkTheme: false,
      navVisible: false
    };
  },
  methods: {
    toggleNav() {
      this.navVisible = !this.navVisible;
    },
    setChronicle(chronicleName) {
      this.chronicleName = chronicleName
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
    }
  },
  mounted() {
    if (localStorage.darkTheme !== undefined) {
      this.darkTheme = localStorage.darkTheme === "true";
    }
  },
  watch: {
    darkTheme(_darkTheme) {
      localStorage.darkTheme = _darkTheme;
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

@media screen and (max-width: 1264px) {
  .first-nav {
    position: absolute;
    top: 0;
    left: 0;
  }
  .second-nav {
    position: absolute;
    top: 0;
    left: 60px;
  }
}
</style>
