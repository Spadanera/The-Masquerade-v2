<template>
  <div>
    <Toolbar title="vampire the masquerade" short-title="VTM" :user-menu="false"/>
    <v-content class="max-height">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Toolbar from "../components/layout/Toolbar.vue";
export default {
  components: {
    Toolbar
  }
};
</script>

<style>
</style>
