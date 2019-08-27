<template>
  <v-card style="display: flex; flex-direction: column; height: 100%">
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ chronicle.name }}</div>
        <span class="grey--text">{{ moment(chronicle.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</span>
      </div>
    </v-card-title>
    <v-card-text style="flex: 1">{{ chronicle.shortDescription }}</v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="info" dark @click="openChronicle(chronicle._id)">Open</v-btn>
      <v-btn v-if="!player" color="error" @click="modalDelete">Delete</v-btn>
    </v-card-actions>
    <Confirm v-if="!player" :dialog="dialog" @confirm="deleteChronicle" :title="modalTitle" :text="modalText" @close="dialog = false" />
  </v-card>
</template>

<script>
import Confirm from "../layout/Confirm.vue";
import client from "../../services/client";
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
      this.modalTitle = "Are you sure"
      this.modalText = "All the stories connected will be deleted";
      this.dialog = true;
    },
    async deleteChronicle() {
      await this.Service.chronicleService.deleteChronicle(this.chronicle._id);
      this.$emit("submitted", "Chronicle successfully deleted");
    },
    openChronicle (id, name) {
      this.$router.push({ path: `${this.$route.path}/chronicle/${id}/${this.$route.path === '/story-teller' ? 'dashboard' : 'characters'}` });
    }
  }
};
</script>

<style>

</style>
