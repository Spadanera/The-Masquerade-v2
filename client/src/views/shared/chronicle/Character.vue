<template>
  <Sheet
    :characterId="$route.params.characterid"
    :showToolbar="true"
    :showActions="true"
    :autoReload="false"
    @close="close"
  />
</template>

<script>
import Sheet from "../../../components/characters/Sheet.vue";
export default {
  components: {
    Sheet
  },
  props: {
    characterService: Object
  },
  methods: {
    close() {
      this.characterService.close(this);
    }
  }
};
</script>

<style>
</style>
