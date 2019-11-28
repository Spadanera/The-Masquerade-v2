<template>
  <v-container fluid grid-list-md>
    <div v-if="!chronicles.length && loaded">
      <NoChronicles @submitted="submitted('Chronicle successfully created')"/>
    </div>
    <div v-if="chronicles.length">
      <v-layout wrap justify-space-around>
        <v-flex
          xs12
          sm12
          md12
          lg6
          xl6
          v-for="chronicle in chronicles"
          v-bind:key="chronicle._id"
          class="my-2"
        >
          <ChronicleCard :chronicle="chronicle" @submitted="submitted"/>
        </v-flex>
      </v-layout>
      <AddChronicle
        :dialog="dialog"
        @close="dialog = false"
        @submitted="submitted('Chronicle successfully created')"
      />
      <v-btn color="primary" dark fixed bottom right fab @click="dialog = true">
        <v-icon @click="dialog=true">add</v-icon>
      </v-btn>
    </div>
    <v-snackbar
      v-model="snackbar.enabled"
      :bottom="true"
      :left="false"
      :multi-line="false"
      :right="false"
      :timeout="3000"
      :vertical="false"
    >
      {{ snackbar.text }}
      <v-btn color="red" text @click="snackbar.enabled = false">{{$ml.get("close")}}</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import NoChronicles from "../../components/chronicles/NoChronicles.vue";
import ChronicleCard from "../../components/chronicles/ChronicleCard.vue";
import AddChronicle from "../../components/chronicles/AddChronicle.vue";
export default {
  components: {
    NoChronicles,
    ChronicleCard,
    AddChronicle
  },
  data() {
    return {
      dialog: false,
      chronicles: [],
      section: "Live",
      snackbar: {
        enebled: false,
        text: ""
      },
      loaded: false
    };
  },
  methods: {
    async loadList() {
      this.chronicles = await this.Service.chronicleService.getChronicles();
      this.loaded = true;
    },
    submitted(text) {
      this.snackbar = {
        enabled: true,
        text
      };
      this.loadList();
    }
  },
  created() {
    this.loadList();
    this.$emit("chronicle", "");
  }
};
</script>

<style>
  .selected {
    color: red;
  }
</style>

