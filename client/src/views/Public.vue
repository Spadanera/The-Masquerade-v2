<template>
  <div>
    <Toolbar title="role playing addicted" short-title="RPA" :user-menu="false" rootMenu="/"/>
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
