<template>
  <v-layout align-start justify-start fill-height>
    <v-flex
      shrink
      style="height: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); background-color: white"
    >
      <v-list style="width: 400px" subheader three-line>
        <v-subheader class="headline">Coterie</v-subheader>
        <template v-for="(coterie, index) in coteries">
          <v-list-tile :key="coterie._id" @click="select(index)">
            <v-list-tile-content>
              <v-list-tile-title v-html="coterie.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="coterie.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-coterie primary" v-if="selectedIndex === index"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" @click="dialog=true">Create Coterie</v-btn>
    </v-flex>
    <v-flex grow style="height: 100%">
      <v-layout fill-height fluid>
        <v-flex></v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-flex>
    <AddCoterie
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="coterieAdded"
      @close="dialog = false"
    />
  </v-layout>
</template>

<script>
import client from "../../../services/client";
import AddCoterie from "../../../components/coteries/AddCoterie.vue";
export default {
  components: {
    AddCoterie
  },
  data() {
    return {
      coteries: [],
      dialog: false,
      selectedIndex: -1
    };
  },
  methods: {
    async getCoteries() {
      let response = await client.get(
        `/api/coteries/all/${this.$route.params.id}`
      );
      this.coteries = response.data;
    },
    select(index) {
      this.selectedIndex = index;
    },
    async coterieAdded() {
      await this.getCoteries();
      if (this.selectedIndex > -1) {
        this.selectedIndex++;
      }
    }
  },
  created() {
    this.getCoteries();
  }
};
</script>

<style>
.selected-coterie {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  right: 0;
}
</style>
