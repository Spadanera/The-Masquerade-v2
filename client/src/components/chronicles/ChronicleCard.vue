<template>
  <v-card style="display: flex; flex-direction: column; height: 100%">
    <v-card-title class="headline">{{ chronicle.name }}</v-card-title>
    <v-card-subtitle>{{ moment(chronicle.createdAt).format(`${ml.get("dateFormat")}, h:mm:ss a`) }}</v-card-subtitle>
    <v-card-text style="flex: 1">{{ chronicle.shortDescription }}</v-card-text>
    <v-card-actions >
      <v-spacer></v-spacer>
      <v-btn text @click="openChronicle(chronicle._id)">{{$ml.get("open")}}</v-btn>
      <v-btn text v-if="!player" color="error" @click="modalDelete">{{$ml.get("delete")}}</v-btn>
    </v-card-actions>
    <Confirm v-if="!player" :dialog="dialog" @confirm="deleteChronicle" :title="modalTitle" :text="modalText" @close="dialog = false" />
  </v-card>
</template>

<script>
import Confirm from "../layout/Confirm.vue";
export default {
  name: "ChronicleCard",
  data() {
    return {
      dialog: false,
      modalTitle: "",
      modalText: ""
    };
  },
  components: {
    Confirm
  },
  props: {
    chronicle: Object,
    player: Boolean
  },
  methods: {
    modalDelete() {
      this.modalTitle = this.$ml.get("areYouSure");
      this.modalText = this.$ml.get("dataWillBeDeleted");
      this.dialog = true;
    },
    async deleteChronicle() {
      await this.Service.chronicleService.deleteChronicle(this.chronicle._id);
      this.$emit("submitted", this.$ml.get("chronicleDeleted"));
    },
    openChronicle (id) {
      this.$router.push({ path: `${this.$route.path}/chronicle/${id}/${this.$route.path === '/story-teller' ? 'dashboard' : 'characters'}` });
    }
  }
};
</script>

<style>

</style>
