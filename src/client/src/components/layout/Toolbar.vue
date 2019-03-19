<template>
  <v-toolbar app fixed clipped-left color="primary" dark>
    <v-toolbar-side-icon
      v-if="leftBottonVisible"
      class="hidden-lg-and-up"
      @click="$emit('toggle-nav')"
    ></v-toolbar-side-icon>
    <img src="../../assets/vmplogo.png" />
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" tag="span">
      <span class="hidden-sm-and-down">{{ title }}</span>
      <span class="hidden-md-and-up">{{ shortTitle }}</span>
      </router-link>

      <span class="font-weight-light"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/configurations" icon>
      <v-icon>settings</v-icon>
    </v-btn>
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
    shortTitle: String,
    leftBottonVisible: Boolean
  }
};
</script>

<style>
.v-toolbar__title {
  cursor: pointer;
}
img {
  width: 45px;
}
</style>
