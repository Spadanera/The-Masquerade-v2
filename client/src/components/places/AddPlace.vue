<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <span v-if="!place._id" class="headline">Create New Place</span>
        <span v-else>Update Place</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form" v-model="valid">
            <!-- <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete> -->
            <GoogleMapsAutocomplete
              @input="setPlace"
              v-model="currentPlace"
              label="Enter an address"
              v-if="!place._id"
            />
            <v-text-field
              readonly
              v-else
              v-model="currentPlace.formatted_address"
              label="Address"
              placeholder="Placeholder"
            ></v-text-field>
            <v-text-field v-model="title" label="Name" required></v-text-field>
            <v-autocomplete
              v-model="selectedPlayers"
              :items="players"
              outlined
              chips
              item-text="userDisplayName"
              item-value="_id"
              label="Player visibility"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.userPicture"></v-img>
                  </v-avatar>
                  {{ data.item.userDisplayName }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img :src="data.item.userPicture" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.userDisplayName"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Dismiss</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GoogleMapsAutocomplete from "../../components/places/GoogleMapsAutocomplete";
export default {
  components: {
    GoogleMapsAutocomplete
  },
  props: {
    dialog: Boolean,
    place: Object,
    players: Array
  },
  data() {
    return {
      valid: true,
      title: "",
      description: "",
      currentPlace: {},
      selectedPlayers: []
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
      this.title = "";
      this.description = "";
      this.selectedPlayers = [];
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    async submit() {
      if (this.$refs.form.validate()) {
        let playerVisibility = [];
        for (let i = 0; i < this.selectedPlayers.length; i++) {
          let player = this.players.find(
            p => p._id === this.selectedPlayers[i]
          );
          if (player) {
            playerVisibility.push({
              playerId: player._id
            });
          }
        }
        if (this.place._id) {
          await this.Service.placeService.updatePlace(this.place._id, {
            title: this.title,
            description: this.description,
            gmaps: JSON.stringify(this.currentPlace),
            playerVisibility: playerVisibility
          });
        } else {
          await this.Service.placeService.createPlace(this.$route.params.id, {
            title: this.title,
            description: this.description,
            gmaps: JSON.stringify(this.currentPlace),
            playerVisibility: playerVisibility
          });
        }
        this.$emit("submitted", this.coterieId);
        this.closeModal();
      }
    },
    remove(item) {
      const index = this.selectedPlayers.indexOf(item._id);
      if (index >= 0) {
        this.selectedPlayers.splice(index, 1);
      }
    }
  },
  async created() {},
  computed: {
    placeId() {
      return this.place._id;
    }
  },
  watch: {
    placeId: {
      immediate: true,
      handler(value) {
        if (value) {
          this.title = this.place.title;
          this.description = this.place.description;
          if (this.place.playerVisibility) {
            this.selectedPlayers = this.place.playerVisibility.map(
              p => p.playerId
            );
          }
          this.currentPlace = this.place.gmaps;
        } else {
          this.title = "";
          this.description = "";
          this.selectedPlayers = [];
        }
      }
    }
  }
};
</script>

<style>
</style>