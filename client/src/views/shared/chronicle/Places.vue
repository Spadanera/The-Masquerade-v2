<template>
  <v-layout align-start justify-start fill-height class="places">
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
      v-touch="{ left: () => ownNavVisible = false }"
    >
      <div class="v-subheader headline theme--light">{{$ml.get("places")}}</div>
      <v-expansion-panels multiple class="no-padding" accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>{{$ml.get("general")}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list subheader two-line>
              <v-list-item-group v-model="index">
                <v-list-item
                  v-for="(place, i) in places"
                  :key="i"
                  @click="selectPlace(place, i, false)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{place.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{place.gmaps.formatted_address}}</v-list-item-subtitle>
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
                    @click="deletePlace(place)"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    class="onhover move-left"
                    @click="editPlace(place)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>{{$ml.get("refuges")}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list subheader two-line>
              <v-list-item-group v-model="indexRefuge">
                <v-list-item
                  v-for="(place, i) in refuges"
                  :key="i"
                  @click="selectPlace(place, i, true)"
                >
                  <v-list-item-avatar>
                    <img :src="place.picture" :alt="place.name" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{place.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{place.gmaps.formatted_address}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <GmapMap :center="center" :zoom="zoom" style="width: 100%; height: 100%">
      <GmapMarker
        :key="i"
        :title="place.title"
        :label="i === index && place.title ? place.title : undefined"
        v-for="(place, i) in places"
        :position="place.gmaps.geometry.location"
        :clickable="true"
        @click="selectPlace(place, i)"
      />
      <GmapMarker
        :key="place._id"
        :title="place.name"
        :label="i === indexRefuge && place.name ? place.name : undefined"
        v-for="(place, i) in refuges"
        :position="place.gmaps.geometry.location"
        :clickable="true"
        @click="selectPlace(place, i, true)"
      />
    </GmapMap>
    <v-layout v-if="index > -1"></v-layout>
    <v-btn v-if="isStoryTeller" color="primary" dark fixed bottom left fab @click="addPlaceModal()">
      <v-icon>add</v-icon>
    </v-btn>
    <AddPlace
      v-if="isStoryTeller"
      :dialog="dialog"
      @submitted="getPlaces"
      @close="closeModal"
      :place="selectedPlace"
      :players="players"
    />
  </v-layout>
</template>

<script>
import AddPlace from "../../../components/places/AddPlace";
export default {
  components: {
    AddPlace
  },
  props: {
    navVisible: Boolean,
    sessionOnGoing: Boolean,
    gmaps: String,
    isStoryTeller: Boolean
  },
  data() {
    return {
      markers: [],
      places: [],
      refuges: [],
      zoom: 12,
      index: -1,
      indexRefuge: -1,
      center: { lat: 45.46, lng: 9.19 },
      dialog: false,
      selectedPlace: {},
      players: []
    };
  },
  async created() {
    if (this.gmaps) {
      let gmaps = JSON.parse(this.gmaps);
      this.center = {
        lat: parseFloat(gmaps.geometry.location.lat),
        lng: parseFloat(gmaps.geometry.location.lng)
      };
    }
    this.players = await this.Service.playerService.getGroups(
      this.$route.params.id
    );
    this.getPlaces();
  },
  methods: {
    async remove(placeId, playerId) {
      let place = this.places.find(p => p._id === placeId);
      let index = place.selectedPlayers.indexOf(playerId);
      if (index >= 0) {
        place.selectedPlayers.splice(index, 1);
      }
      place.playerVisibility = place.selectedPlayers.map(p => {
        return {
          playerId: p
        };
      });
      await this.Service.placeService.updatePlace(place._id, place);
      await this.getPlaces();
    },
    async deletePlace(place) {
      let res = await this.$confirm(
        this.$ml.with("0", place.title).get("confirmDelete"),
        {
          title: this.$ml.get("warning")
        }
      );
      if (res) {
        await this.Service.placeService.deletePlace(place._id);
        this.getPlaces();
      }
    },
    editPlace(place) {
      this.selectedPlace = place;
      this.dialog = true;
    },
    addPlaceModal() {
      this.dialog = true;
      this.selectedPlace = {};
    },
    async getPlaces() {
      this.Service.placeService.getPlaces(
        this.$route.params.id
      ).then(response => {
        let places = response;
        for (let i = 0; i < places.length; i++) {
          let gmaps = JSON.parse(places[i].gmaps);
          places[i].gmaps = gmaps;
          places[i].selectedPlayers = places[i].playerVisibility.map(
            pv => pv.playerId
          );
        }
        this.places = places;
      });

      this.Service.placeService.getRefuges(
        this.$route.params.id
      ).then(response => {
        let places = response;
        for (let i = 0; i < places.length; i++) {
          let gmaps = JSON.parse(places[i].refuge);
          places[i].gmaps = gmaps;
        }
        this.refuges = places;
      });
    },
    closeModal() {
      this.selectedPlace = {};
      this.dialog = false;
    },
    selectPlace(place, index, isRefuge) {
      if (isRefuge) {
        this.index = -1;
        this.indexRefuge = index;
      } else {
        this.index = index;
        this.indexRefuge = -1;
      }
      this.selectedPlace = place;
      this.center = place.gmaps.geometry.location;
      this.ownNavVisible = false;
    }
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
input {
  background: none;
  color: mix(white, #424242, 70%);
  font-size: 14px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid mix(white, #424242, 70%);
}

input:focus {
  outline: none;
}
input:focus ~ label,
input:valid ~ label {
  top: -14px;
  font-size: 12px;
  color: #2196f3;
}
input:focus ~ .bar:before {
  width: 300px;
}

input[type="password"] {
  letter-spacing: 0.3em;
}

label {
  color: mix(white, #424242, 70%);
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
}

.bar {
  position: relative;
  display: block;
  width: 300px;
}

.bar:before {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: #2196f3;
  transition: 300ms ease all;
  left: 0%;
}

.places .v-list-item__content {
  padding-bottom: 0 !important;
}

@media screen and (min-width: 1264px) {
  .v-btn--left.v-btn--fixed {
    position: absolute !important;
    left: 400px !important;
  }
}

.move-left {
  right: 60px !important;
}

.no-padding .v-expansion-panel-content__wrap {
  padding: 0;
}

.vue-map-container div {
  font-size: 20px !important;
}
</style>