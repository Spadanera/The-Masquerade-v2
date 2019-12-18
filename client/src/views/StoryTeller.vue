<template>
  <div>
    <Toolbar
      @theme="toggleTheme"
      v-on:toggle-nav="toggleNav"
      title="role playing addicted" short-title="RPA"
      :chronicle-name="chronicleName"
      :user-menu="true"
      rootMenu="/story-teller"
    />
    <v-content class="max-height">
      <router-view @chronicle="setChronicle" class="max-height" :nav="nav" />
    </v-content>
    <NprogressContainer />
  </div>
</template>

<script>
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
import Toolbar from "../components/layout/Toolbar.vue";
export default {
  components: {
    NprogressContainer,
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
      this.chronicleName = chronicleName;
    },
    toggleTheme() {
      this.$emit("theme");
    }
  }
};
</script>

<style>
#nprogress .bar {
  background: #ffffff !important;
  height: 3px !important;
}

#nprogress .peg {
  display: none !important;
}
</style>
