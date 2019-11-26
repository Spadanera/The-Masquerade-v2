<template>
  <v-layout column>
    <v-flex pa-3>
      <v-card>
        <v-card-text>
          <div class="xs12 title text-center" style="margin: auto">Main Information</div>
          <v-layout row wrap justify-space-around justify-center>
            <v-flex shrink xs12 sm4 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mainInformation.concept"
                label="Concept"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs12 sm4 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mainInformation.predator"
                label="Predator"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs12 sm4 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mainInformation.sire"
                label="Sire"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-around justify-center>
            <v-flex shrink xs12 sm6 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mainInformation.ambition"
                label="Ambition"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs12 sm6 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mainInformation.desire"
                label="Desire"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex pa-3>
      <v-card>
        <v-card-text>
          <div class="xs12 title text-center" style="margin: auto">Mortal life</div>
          <v-layout row wrap justify-space-around justify-center>
            <v-flex shrink xs6 sm3 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mortal.trueAge"
                label="True Age"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs6 sm3 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mortal.apparentAge"
                label="Apparent Age"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs6 sm3 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mortal.dateOfBirth"
                label="Date of Birth"
                type="date"
              ></v-text-field>
            </v-flex>
            <v-flex shrink xs6 sm3 pa-2>
              <v-text-field
                :readonly="readonly"
                v-model="character.mortal.dateOfDeath"
                label="Date of Death"
                type="date"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex pa-3>
      <v-card>
        <v-card-subtitle>
          <div class="xs12 title text-center" style="margin: auto">Refuge</div>
          <div v-if="place.geometry && readonly">
            {{place.formatted_address}}
          </div>
          <div v-if="!readonly">
            <GoogleMapsAutocomplete
              @input="setPlace"
              v-model="currentPlace"
              label="Enter an address"
            />
          </div>
        </v-card-subtitle>
        <v-card-text v-if="place.geometry" style="height: 400px; ">
          <GmapMap :center="center" :zoom="zoom" style="width: 100%; height: 100%">
            <GmapMarker
              title="Refuge"
              :position="place.geometry.location"
              :clickable="true"
            />
          </GmapMap>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import GoogleMapsAutocomplete from "../../components/places/GoogleMapsAutocomplete";
export default {
  components: {
    GoogleMapsAutocomplete
  },
  props: {
    character: Object,
    readonly: Boolean
  },
  data() {
    return {
      zoom: 13,
      center: { lat: 45.46, lng: 9.19 },
      place: {},
      currentPlace: {}
    };
  },
  methods: {
    setPlace(place) {
      this.place = place;
      this.character.refuge = JSON.stringify(this.place);
    },
  },
  created() {
    if (this.character.refuge) {
      this.place = JSON.parse(this.character.refuge);
    }
  },
  watch: {
    place: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value && value.geometry) {
          this.center = value.geometry.location;
        }
      }
    }
  }
};
</script>

<style>
</style>
