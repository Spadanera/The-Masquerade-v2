<template>
  <v-app>
    <Toolbar v-on:toggle-nav="toggleNav" />
    <v-content>
      <v-navigation-drawer v-model="drawer" app clipped>
        <Treeview />
      </v-navigation-drawer>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Toolbar from "./layout/Toolbar.vue";
import Treeview from "./layout/Treeview.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
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
