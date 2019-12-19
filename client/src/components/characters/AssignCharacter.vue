<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>{{$ml.get("assign")}}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form">
            <v-select v-model="selectedGroup" :items="groups" item-value="_id" item-text="name"></v-select>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">{{$ml.get("dismiss")}}</v-btn>
        <v-btn color="blue darken-1" text @click="submit">{{$ml.get("confirm")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      selectedGroup: ""
    };
  },
  props: {
    dialog: Boolean,
    character: Object,
    characterService: Object
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    async submit() {
      await this.characterService.updateCharacter(
        this.character._id,
        this.character,
        this.selectedGroup,
        this.$route.params.listid
      );
      this.$emit("close", false);
    }
  },
  async created() {
    this.groups = (await this.Service.playerService.getGroups(
      this.$route.params.id
    ))
      .filter(p => {
        return p.characters.filter(c => c.alive === "alive").length === 0;
      })
      .map(p => {
        p.name = p.userDisplayName;
        return p;
      });
    this.groups = this.groups.concat(
      (await this.Service.coterieService.getGroups(
        this.$route.params.id
      )).filter(c => c._id !== this.$route.params.listid)
    );
  }
};
</script>

<style>
</style>