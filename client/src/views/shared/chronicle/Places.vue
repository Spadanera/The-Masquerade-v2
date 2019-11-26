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
      <v-list subheader two-line>
        <v-subheader class="headline">Places</v-subheader>
        <v-list-item-group v-model="index">
          <v-list-item v-for="(place, i) in places" :key="i" @click="selectPlace(place, i)">
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
    </v-navigation-drawer>
    <GmapMap :center="center" :zoom="zoom" style="width: 100%; height: 100%">
      <GmapMarker
        :key="i"
        :title="place.title"
        v-for="(place, i) in places"
        :position="place.gmaps.geometry.location"
        :clickable="true"
        @click="selectPlace(place, i)"
        :icon="i === index && place.gmaps.icon ? { url: place.gmaps.icon } : undefined"
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
    gmaps: Object,
    isStoryTeller: Boolean
  },
  data() {
    return {
      markers: [],
      places: [],
      zoom: 13,
      index: -1,
      center: { lat: 45.46, lng: 9.19 },
      dialog: false,
      selectedPlace: {},
      players: []
    };
  },
  async created() {
    if (this.gmaps) {
      this.center = {
        lat: this.gmaps.lat,
        lng: this.gmaps.lng
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
        `Do you really want to delete ${place.title}?`,
        {
          title: "Warning"
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
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    async getPlaces() {
      let places = (places = await this.Service.placeService.getPlaces(
        this.$route.params.id
      ));
      for (let i = 0; i < places.length; i++) {
        let gmaps = JSON.parse(places[i].gmaps);
        places[i].gmaps = gmaps;
        places[i].selectedPlayers = places[i].playerVisibility.map(
          pv => pv.playerId
        );
      }
      this.places = places;
    },
    closeModal() {
      this.selectedPlace = {};
      this.dialog = false;
    },
    selectPlace(place, index, notToCloseNav) {
      this.index = index;
      this.selectedPlace = place;
      this.center = place.gmaps.geometry.location;
      if (!notToCloseNav) {
        this.ownNavVisible = false;
      }
    }
  },
  watch: {
    navVisible: function(newValue) {
      this.ownNavVisible = newValue;
    },
    gmaps: function(newValue) {
      if (newValue) {
        this.center = {
          lat: newValue.lat,
          lng: newValue.lng
        };
        this.zoom = newValue.zoom;
      }
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
  right: 60px !important
}
</style>