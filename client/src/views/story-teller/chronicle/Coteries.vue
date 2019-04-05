<template>
  <v-layout align-start justify-start fill-height>
    <v-flex
      shrink
      style="height: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); background-color: #424242"
    >
      <v-list style="width: 400px" subheader three-line>
        <v-subheader class="headline">Coterie</v-subheader>
        <template v-for="(coterie) in coteries">
          <v-list-tile :key="coterie._id" @click="select(coterie)">
            <v-list-tile-content>
              <v-list-tile-title v-html="coterie.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="coterie.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-coterie primary" v-if="coterie._id === $route.params.conterieid"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" @click="dialog=true">Create Coterie</v-btn>
    </v-flex>
    <router-view></router-view>
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
      dialog: false
    };
  },
  methods: {
    async getCoteries() {
      let response = await client.get(
        `/api/coteries/all/${this.$route.params.id}`
      );
      this.coteries = response.data;
    },
    async select(coterie) {
      this.$router.push(`/chronicle/${this.$route.params.id}/coteries/${coterie._id}`);
    },
    async coterieAdded() {
      await this.getCoteries();
    }
  },
  created() {
    this.getCoteries();
  }
};
</script>

<style>
.selected-coterie {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  left: 0;
}
</style>
