<template>
  <div>
    <Toolbar
      @theme="toggleTheme"
      v-on:toggle-nav="toggleNav"
      title="role playing addicted" short-title="RPA"
      :chronicle-name="chronicleName"
      :user-menu="true"
      rootMenu="/player"
    />
    <v-content class="max-height">
      <router-view @chronicle="setChronicle" class="max-height" :nav="nav"/>
    </v-content>
  </div>
</template>

<script>
import Toolbar from "../components/layout/Toolbar.vue";
export default {
    components: {
    Toolbar
  },
  data() {
    return {
      chronicleName: "",
      darkTheme: false,
      nav: {
        visible: false
      }
    };
  },
  methods: {
    toggleNav() {
      this.nav.visible = !this.nav.visible;
    },
    setChronicle(chronicleName) {
      this.chronicleName = chronicleName
    },
    toggleTheme() {
      this.$emit("theme");
    }
  }
};
</script>

<style>
</style>