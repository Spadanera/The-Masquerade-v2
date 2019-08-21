<template>
  <v-container fluid grid-list-md>
    <div v-if="!chronicles.length">
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">No Chronicle for you</div>
                <span class="grey--text">You have to be invited by a story teller</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
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
          <ChronicleCard :chronicle="chronicle" :player="true"/>
        </v-flex>
      </v-layout>
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
      <v-btn color="red" flat @click="snackbar.enabled = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import NoChronicles from "../../components/chronicles/NoChronicles.vue";
import ChronicleCard from "../../components/chronicles/ChronicleCard.vue";
import chronicleService from "../../services/rest/chronicles/player";
export default {
  components: {
    NoChronicles,
    ChronicleCard
  },
  data() {
    return {
      dialog: false,
      chronicles: [],
      section: "Live",
      snackbar: {
        enebled: false,
        text: ""
      }
    };
  },
  methods: {
    async loadList() {
      let response = await chronicleService.loadList();
      this.chronicles = response.data;
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

