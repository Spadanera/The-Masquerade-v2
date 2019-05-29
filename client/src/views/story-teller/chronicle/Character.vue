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
  methods: {
    close() {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/coteries/${
          this.$route.params.conterieid
        }`
      );
    }
  }
};
</script>

<style>
</style>
