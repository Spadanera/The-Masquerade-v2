<template>
  <Sheet
    :characterId="$route.params.characterid"
    :showToolbar="true"
    :showActions="true"
    :autoReload="false"
    @close="close"
    :characterService="groupService"
    :edit="edit"
    :isPlayer="isPlayer"
  />
</template>

<script>
import Sheet from "../../../components/characters/Sheet.vue";
export default {
  components: {
    Sheet
  },
  props: {
    groupService: Object,
    edit: Boolean,
    isPlayer: Boolean
  },
  methods: {
    close() {
      this.groupService.closeCharacter(this);
    }
  }
};
</script>

<style>
</style>
