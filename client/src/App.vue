<template>
  <v-app :dark="darkTheme" class="max-height">
    <router-view class="max-height damasco" @theme="toggleTheme"></router-view>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      darkTheme: false
    };
  },
  methods: {
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
