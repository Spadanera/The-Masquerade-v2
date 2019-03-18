<template>
  <v-container fluid grid-list-md>
    <div v-if="!chronicles.length">
      <NoChronicles/>
    </div>
    <div v-if="chronicles.length">
      <v-layout wrap justify-space-around>
        <v-flex xs12 sm12 md6 lg4 xl3 v-for="chronicle in chronicles" v-bind:key="chronicle._id" class="my-2">
          <ChronicleCard :chronicle="chronicle" @submitted="loadList"/>
        </v-flex>
      </v-layout>
      <AddChronicle :dialog="dialog" @close="dialog = false" @submitted="loadList" />
      <v-btn color="error" dark fixed bottom right fab @click="dialog = true">
        <v-icon @click="dialog=true">add</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import NoChronicles from "../../../components/chronicles/NoChronicles.vue";
import ChronicleCard from "../../../components/chronicles/ChronicleCard.vue";
import AddChronicle from "../../../components/chronicles/AddChronicle.vue";
import client from "../../../services/client";
export default {
  components: {
    NoChronicles,
    ChronicleCard,
    AddChronicle
  },
  data() {
    return {
      dialog: false,
      chronicles: [
      ]
    };
  },
  methods: {
    async loadList () {
      let response = await client.get("/chronicles");
      this.chronicles = response.data;
    }
  },
  created () {
    this.loadList();
  }
};
</script>

<style>
</style>

