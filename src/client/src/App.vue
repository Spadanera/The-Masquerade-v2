<template>
  <v-app>
    <Toolbar v-on:toggle-nav="toggleNav" title="the masquerade" />
    <v-content>
      <v-navigation-drawer v-model="drawer" app clipped>
        <Treeview />
      </v-navigation-drawer>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./layout/Toolbar.vue";
import Treeview from "./layout/Treeview.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    Treeview
  },
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    toggleNav() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
