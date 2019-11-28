<template>
  <v-menu left offset-x origin="center center" transition="scale-transition" class="to-click">
    <template v-slot:activator="{ on }">
      <span class="to-click" v-on="on" text>{{$ml.get(currentLanguage)}}</span>
    </template>

    <v-list>
      <v-list-item v-for="(lang, i) in $ml.list" :key="i" @click="changeLanguage(lang)">
        <v-list-item-title>{{ $ml.get(lang) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: "english"
    };
  },
  methods: {
    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$ml.change(lang);
      this.$emit("close");
    }
  },
  created() {
    this.currentLanguage = this.$ml.current;
  }
};
</script>

<style>
.to-click {
  cursor: pointer;
}
</style>