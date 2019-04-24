<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="navVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6"
    >
      <v-list
        subheader
        three-line
      >
        <v-subheader class="headline">Coterie</v-subheader>
        <template v-for="(coterie) in coteries">
          <v-list-tile :key="coterie._id" @click="select(coterie)">
            <v-list-tile-content>
              <v-list-tile-title v-html="coterie.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="coterie.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-element primary" v-if="coterie._id === $route.params.conterieid"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" style="padding-top: 2px;" @click="dialog=true">Create Coterie</v-btn>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-flex v-if="coteries.length === 0 && !navVisible" class="hidden-lg-and-up">
      <v-btn color="primary" @click="dialog=true">Create Coterie</v-btn>
    </v-flex>
    <AddCoterie
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="coterieAdded(coterieId)"
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
  props: {
    navVisible: Boolean
  },
  data() {
    return {
      coteries: [],
      dialog: false,
      ownNavVisible: true
    };
  },
  methods: {
    async getCoteries(coterieId) {
      let response = await client.get(
        `/api/coteries/all/${this.$route.params.id}`
      );
      this.coteries = response.data;
      if (this.coteries.length) {
        let find = this.coteries.find(c => c._id === coterieId);
        if (find) {
          this.select(find);
        }
        else {
          this.select(this.coteries[0]);
        }
      }
    },
    select(coterie) {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/coteries/${coterie._id}`
      );
    },
    async coterieAdded(coterieId) {
      await this.getCoteries(coterieId);
    }
  },
  created() {
    this.getCoteries();
  }
};
</script>

<style>

</style>
