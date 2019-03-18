<template>
  <v-card style="display: flex; flex-direction: column; height: 100%" class="_blood">
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ chronicle.name }}</div>
        <span class="grey--text">{{ moment(chronicle.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</span>
      </div>
    </v-card-title>
    <v-card-text style="flex: 1">{{ chronicle.description }}</v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="indigo" dark>Open</v-btn>
      <v-btn color="error" @click="modalDelete">Delete</v-btn>
    </v-card-actions>
    <Confirm :dialog="dialog" @confirm="deleteChronicle" :title="modalTitle" :text="modalText" @close="dialog = false" />
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
    chronicle: Object
  },
  methods: {
    modalDelete() {
      this.modalTitle = "Are you sure"
      this.modalText = "All the stories connected will be deleted";
      this.dialog = true;
    },
    async deleteChronicle() {
      await client.delete(`/chronicles/${this.chronicle._id}`);
      this.$emit("submitted");
    }
  }
};
</script>

<style>
.blood {
  background-image: url(../../assets/blood5.png);
  background-repeat: repeat-y;
  background-attachment: fixed;
  /*background-size: cover; */
  background-size: contain;
}
</style>
