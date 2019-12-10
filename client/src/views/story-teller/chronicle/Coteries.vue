<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
      v-touch="{ left: () => ownNavVisible = false }"
    >
      <v-list subheader three-line>
        <v-subheader class="headline">{{$ml.get("coterie")}}</v-subheader>
        <v-skeleton-loader
          type="list-item-three-line"
          :loading="!loaded"
          transition="fade-transition"
        >
          <v-list-item-group v-model="index">
            <v-list-item
              v-for="(coterie, i) in coteries"
              :key="i"
              @click="select(coterie, false, true)"
            >
              <v-list-item-content>
                <v-list-item-title v-html="coterie.name"></v-list-item-title>
                <v-list-item-subtitle v-html="coterie.description"></v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                color="primary"
                dark
                absolute
                small
                bottom
                right
                fab
                class="onhover"
                @click="modalDelete(coterie._id)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-skeleton-loader>
      </v-list>
      <v-btn
        color="primary"
        style="padding-top: 2px;"
        @click="dialog=true"
      >{{$ml.get("createCoterie")}}</v-btn>
    </v-navigation-drawer>

    <router-view :description="coterieDescription" :groupname="coterieName"></router-view>

    <v-flex v-if="coteries.length === 0 && !navVisible" class="hidden-lg-and-up">
      <v-btn color="primary" @click="dialog=true">{{$ml.get("createCoterie")}}</v-btn>
    </v-flex>
    <AddCoterie
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="coterieAdded"
      @close="dialog = false"
    />
    <Confirm
      :dialog="modal"
      @confirm="deleteGroup"
      :title="modalTitle"
      :text="modalText"
      @close="modal = false"
    />
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
      coterieIdToDelete: "",
      coterieDescription: "",
      coterieName: "",
      index: 0,
      loaded: false
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
      window.setTimeout(() => (this.loaded = true), 300);
    },
    select(coterie, notToCloseNav, forceNavigation) {
      if (!this.$route.params.characterid || forceNavigation) {
        this.index = this.coteries.findIndex(c => c._id === coterie._id);
        if (this.$route.params.listid !== coterie._id) {
          this.$router
            .push(
              `/story-teller/chronicle/${this.$route.params.id}/coteries/${coterie._id}`
            )
            .catch(() => {});
        }
        this.coterieDescription = coterie.description;
        this.coterieName = coterie.name;
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
      this.modalTitle = this.$ml.get("areYouSure");
      this.modalText = this.$ml.get("charactersWillBeDeleted");
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

div[role="listitem"]:hover .onhover {
  display: block !important;
}

/* .fade-enter-active,
.fade-leave-active {
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-move {
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
} */
</style>
