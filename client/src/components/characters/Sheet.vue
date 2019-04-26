<template>
  <div style="width: 100%; position: relative" id="sheet-container" v-if="loaded" class="max-height">
    <v-toolbar tabs style="text-xs-center" :scroll-threshold="40" :scroll-off-screen="true" :scroll-target="'#scrolling-techniques'" absolute>
      <v-toolbar-side-icon>
        <v-avatar size="40px">
          <img :src="character.picture" :alt="character.name">
        </v-avatar>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{ character.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="save">Save</v-btn>
      <v-btn>Kill</v-btn>
      <v-btn @click="close">Close</v-btn>
      <template v-slot:extension style="padding: 0">
        <v-tabs v-model="characterTabs" slider-color="primary" centered grow>
          <v-tab>Characteristics</v-tab>
          <v-tab>Background</v-tab>
          <v-tab>Story</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="characterTabs" id="scrolling-techniques">
      <v-tab-item>
        <v-layout column>
          <v-flex pa-3>
            <v-card>
              <v-card-title>
                <v-layout row wrap justify-space-around justify-center>
                  <v-flex shrink xs12 md4>
                    <div class="subheading text-xs-center mb-2">Health</div>
                    <v-rating
                      v-model="character.health.superficialDamage"
                      empty-icon="radio_button_unchecked"
                      full-icon="radio_button_checked"
                      clearable
                      class="text-xs-center"
                      dense small
                      background-color="secondary"
                      :length="character.health.pool"
                      :readonly="readonly"
                    ></v-rating>
                  </v-flex>
                  <v-flex shrink xs12 md4>
                    <div class="subheading text-xs-center mb-2">Will Power</div>
                    <v-rating
                      v-model="character.willPower.spent"
                      empty-icon="radio_button_unchecked"
                      full-icon="radio_button_checked"
                      clearable
                      class="text-xs-center"
                      dense small
                      background-color="secondary"
                      :length="character.willPower.pool"
                      :readonly="readonly"
                    ></v-rating>
                  </v-flex>
                  <v-flex shrink xs12 md4>
                    <div class="subheading text-xs-center mb-2">Humanity</div>
                    <v-rating
                      v-model="character.humanity"
                      empty-icon="radio_button_unchecked"
                      full-icon="radio_button_checked"
                      clearable
                      class="text-xs-center"
                      dense small
                      background-color="secondary"
                      :length="10"
                      :readonly="readonly"
                    ></v-rating>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row justify-space-around justify-center>
                  <v-flex shrink>
                    <v-select :items="clans" label="Clan" v-model="character.mainInformation.clan"></v-select>
                  </v-flex>
                  <v-flex shrink>
                    <v-select
                      :items="generations"
                      label="Generation"
                      v-model="character.mainInformation.generation"
                    ></v-select>
                  </v-flex>
                  <v-flex shrink>
                    <v-text-field
                      :readonly="readonly"
                      ref="resonance"
                      v-model="character.resonance"
                      label="Resonance"
                    ></v-text-field>
                  </v-flex>
                  <v-flex shrink>
                    <div class="title text-xs-center mb-2">Hunger</div>
                    <v-rating
                      v-model="character.hunger"
                      empty-icon="radio_button_unchecked"
                      full-icon="radio_button_checked"
                      clearable
                      class="text-xs-center"
                      dense small
                      background-color="secondary"
                      :length="5"
                      :readonly="readonly"
                    ></v-rating>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex pa-3>
            <div class="xs12 headline text-xs-center mb-3">Attributes</div>
            <v-card>
              <v-card-title>
                <v-layout row>
                  <v-flex
                    md4
                    v-for="(value, groupName) in character.attributes"
                    v-bind:key="groupName"
                  >
                    <div class="title text-xs-center">{{ capitalize(groupName) }}</div>
                    <div v-for="(attribute, propertyName) in value" v-bind:key="propertyName">
                      <Capacity :capacity="attribute" :readonly="readonly" :maxPoint="maxPoint"/>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex pa-3>
            <div class="xs12 headline text-xs-center mb-3">Skills</div>
            <v-card>
              <v-card-title>
                <v-layout row>
                  <v-flex md4 v-for="(value, groupName) in character.skills" v-bind:key="groupName">
                    <div v-for="(attribute, propertyName) in value" v-bind:key="propertyName">
                      <Capacity :capacity="attribute" :readonly="readonly" :maxPoint="maxPoint"/>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item>Background</v-tab-item>
      <v-tab-item>Story</v-tab-item>
    </v-tabs-items>
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
  </div>
</template>

<script>
import client from "../../services/client";
import Capacity from "./Capacity.vue";
export default {
  components: {
    Capacity
  },
  data() {
    return {
      readonly: false,
      loaded: false,
      maxPoint: 5,
      character: {
        characteristics: {},
        mainInformation: {},
        health: {},
        willPower: {},
        attributes: {},
        skills: {},
        discliplines: [],
        hunger: {},
        humanity: {},
        bloodPotency: {},
        advantages: [],
        flaws: []
      },
      snackbar: {
        enabled: false,
        text: ""
      },
      characterTabs: 0,
      clans: [
        "Bruja",
        "Gangrel",
        "Malkavian",
        "Nosferatu",
        "Toreador",
        "Tremere",
        "Ventrue",
        "Caitiff"
      ],
      generations: [
        "14th",
        "13th",
        "12th",
        "11th",
        "10th",
        "9th",
        "8th",
        "7th",
        "6th",
        "5th",
        "4th",
        "3rd",
        "2nd",
        "1st",
      ]
    };
  },
  methods: {
    async loadCharacter() {
      let response = await client.get(
        `/api/characters/${this.$route.params.characterid}`
      );
      response.data.mainInformation = response.data.mainInformation || {};
      this.character = response.data;
      this.loaded = true;
    },
    close() {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/coteries/${
          this.$route.params.conterieid
        }`
      );
    },
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    async save() {
      await client.put(`/api/characters/${this.character._id}`, this.character);
      this.snackbar.text = "Save successfully";
      this.snackbar.enabled = true;
    }
  },
  created() {
    this.loadCharacter();
  }
};
</script>

<style>
#sheet-container .v-toolbar__extension {
  padding: 0 !important;
}
#sheet-container > .v-window {
  max-height: 100%;
  overflow: auto;
  padding-top: 112px;
}
</style>
