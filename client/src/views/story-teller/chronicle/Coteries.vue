<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
    >
      <v-list subheader three-line>
        <v-subheader class="headline">Coterie</v-subheader>
        <template v-for="(coterie) in coteries">
          <v-list-tile :key="coterie._id" @click="select(coterie, false, true)">
            <v-list-tile-content>
              <v-list-tile-title v-html="coterie.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="coterie.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-btn color="primary" dark absolute small bottom right fab class="onhover" @click="modalDelete(coterie._id)">
              <v-icon>clear</v-icon>
            </v-btn>
            <div class="selected-element primary" v-if="coterie._id === $route.params.listid"></div>
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
      @submitted="coterieAdded"
      @close="dialog = false"
    />
    <Confirm :dialog="modal" @confirm="deleteGroup" :title="modalTitle" :text="modalText" @close="modal = false" />
  </v-layout>
</template>

<script>
import Confirm from "../../../components/layout/Confirm";
import AddCoterie from "../../../components/coteries/AddCoterie.vue";
export default {
  components: {
    AddCoterie,
    Confirm
  },
  props: {
    navVisible: Boolean
  },
  data() {
    return {
      coteries: [],
      dialog: false,
      modal: false,
      modalTitle: "",
      modalText: "",
      coterieIdToDelete: ""
    };
  },
  methods: {
    async getCoteries(coterieId) {
      coterieId = coterieId || this.$route.params.listid;
      this.coteries = await this.Service.coterieService.getGroups(
        this.$route.params.id
      );
      if (this.coteries.length && this.$route.name !== "character") {
        let find = this.coteries.find(c => c._id === coterieId);
        if (find) {
          this.select(find, true);
        } else {
          this.select(this.coteries[0], true);
        }
      }
    },
    select(coterie, notToCloseNav, forceNavigation) {
      if (!this.$route.params.characterid || forceNavigation) {
        this.$router.push(
          `/story-teller/chronicle/${this.$route.params.id}/coteries/${coterie._id}`
        );
      }
      if (!notToCloseNav) {
        this.ownNavVisible = false;
      }
    },
    async coterieAdded(coterieId) {
      await this.getCoteries(coterieId);
    },
    async deleteGroup() {
      await this.Service.coterieService.deleteGroup(this.coterieIdToDelete);
      this.getCoteries();
    },
    modalDelete(coterieId) {
      this.coterieIdToDelete = coterieId;
      this.modalTitle = "Are you sure"
      this.modalText = "All the characters connected will be deleted";
      this.modal = true;
    }
  },
  created() {
    this.getCoteries();
  },
  watch: {
    navVisible: function(newValue) {
      this.ownNavVisible = newValue;
    }
  },
  computed: {
    ownNavVisible: {
      get() {
        return this.navVisible || this.$vuetify.breakpoint.lgAndUp;
      },
      set(val) {
        if (!val) {
          this.$emit("closenavbar");
        }
      }
    }
  }
};
</script>

<style>
.onhover {
  display: none;
}

div[role=listitem]:hover .onhover {
  display: block !important;
}
</style>
