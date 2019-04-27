<template>
  <div
    style="width: 100%; position: relative"
    id="sheet-container"
    v-if="loaded"
    class="max-height"
  >
    <v-toolbar
      tabs
      style="text-xs-center"
      :scroll-threshold="40"
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      absolute
      v-bind:class="{ primary: fighting }"
    >
      <v-toolbar-side-icon>
        <v-avatar size="40px">
          <img :src="character.picture" :alt="character.name">
        </v-avatar>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{ character.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="character.alive && $vuetify.breakpoint.mdAndUp">
        <v-btn v-if="readonly && !fighting" color="primary" @click="fighting = true">Fight</v-btn>
        <v-btn v-if="readonly && fighting" @click="fighting = false">End Fight</v-btn>
        <v-btn @click="readonly= false" v-if="readonly && !fighting">Edit</v-btn>
        <v-btn @click="save" v-if="!readonly && !fighting">Save</v-btn>
        <v-btn @click="loadCharacter" v-if="!readonly && !fighting">Undu</v-btn>
        <v-btn @click="killOrResumeCharacter(false)">Kill</v-btn>
      </div>
      <v-btn
        v-if="!character.alive && $vuetify.breakpoint.mdAndUp"
        @click="killOrResumeCharacter(true)"
      >Resume</v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" @click="close">Close</v-btn>
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
                    <div style="width: 190px; margin: auto">
                      <v-rating
                        v-model="damage"
                        empty-icon="radio_button_unchecked"
                        full-icon="radio_button_checked"
                        clearable
                        dense
                        small
                        background-color="secondary"
                        :length="character.health.pool"
                        :readonly="true"
                      ></v-rating>
                      <v-rating
                        v-model="character.health.superficialDamage"
                        empty-icon="check_box_outline_blank"
                        full-icon="check"
                        clearable
                        dense
                        small
                        background-color="secondary"
                        :length="superficialPool"
                        :readonly="!fighting"
                      ></v-rating>
                      <v-rating
                        v-model="character.health.aggravatedDamage"
                        empty-icon="check_box_outline_blank"
                        full-icon="close"
                        clearable
                        dense
                        small
                        background-color="secondary"
                        :length="aggravatedPool"
                        :readonly="!fighting"
                      ></v-rating>
                    </div>
                  </v-flex>
                  <v-flex shrink xs12 md4>
                    <div class="subheading text-xs-center mb-2">Will Power</div>
                    <div style="width: 190px; margin: auto">
                      <v-rating
                        v-model="character.willPower.pool"
                        empty-icon="radio_button_unchecked"
                        full-icon="radio_button_checked"
                        clearable
                        dense
                        small
                        background-color="secondary"
                        :length="10"
                        :readonly="readonly"
                      ></v-rating>
                      <v-rating
                        v-model="character.willPower.spent"
                        empty-icon="check_box_outline_blank"
                        full-icon="indeterminate_check_box"
                        clearable
                        dense
                        small
                        background-color="secondary"
                        :length="character.willPower.pool"
                        :readonly="readonly && !fighting"
                      ></v-rating>
                    </div>
                  </v-flex>
                  <v-flex shrink xs12 md4>
                    <div class="subheading text-xs-center mb-2">Humanity</div>
                    <v-rating
                      v-model="character.humanity"
                      empty-icon="radio_button_unchecked"
                      full-icon="radio_button_checked"
                      clearable
                      class="text-xs-center"
                      dense
                      small
                      background-color="secondary"
                      :length="10"
                      :readonly="readonly"
                    ></v-rating>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row justify-space-around justify-center wrap>
                  <v-flex xs12 md6>
                    <v-layout justify-space-around justify-center>
                      <v-flex shrink ma-2>
                        <v-select
                          :items="$root.clans"
                          label="Clan"
                          v-model="character.mainInformation.clan"
                          :disable="readonly" :readonly="readonly"
                        ></v-select>
                      </v-flex>
                      <v-flex shrink ma-2>
                        <v-select
                          :items="$root.generations"
                          label="Generation"
                          v-model="character.mainInformation.generation"
                          :disable="readonly" :readonly="readonly"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-layout justify-space-around justify-center>
                      <v-flex shrink ma-2>
                        <v-text-field
                          :readonly="readonly"
                          ref="resonance"
                          v-model="character.resonance"
                          label="Resonance"
                        ></v-text-field>
                      </v-flex>
                      <v-flex shrink ma-2>
                        <div class="subheading text-xs-center mb-2">Hunger</div>
                        <v-rating
                          v-model="character.hunger"
                          empty-icon="radio_button_unchecked"
                          full-icon="radio_button_checked"
                          clearable
                          class="text-xs-center"
                          dense
                          small
                          background-color="secondary"
                          :length="5"
                          :readonly="readonly && !fighting"
                          style="min-width: 108px"
                        ></v-rating>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex pa-3>
            <div class="xs12 headline text-xs-center mb-3">Attributes</div>
            <v-card>
              <v-card-title>
                <v-layout row wrap>
                  <v-flex
                    md4
                    sm12
                    v-for="(value, groupName) in character.attributes"
                    v-bind:key="groupName"
                  >
                    <div class="title text-xs-center">{{ capitalize(groupName) }}</div>
                    <div v-for="(attribute, propertyName) in value" v-bind:key="propertyName">
                      <Capacity
                        :capacity="attribute"
                        :readonly="readonly"
                        :maxPoint="maxPoint"
                        :fighting="fighting"
                      />
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
                <v-layout row wrap>
                  <v-flex
                    md4
                    sm12
                    v-for="(value, groupName) in character.skills"
                    v-bind:key="groupName"
                  >
                    <div v-for="(attribute, propertyName) in value" v-bind:key="propertyName">
                      <Capacity :capacity="attribute" :readonly="readonly" :maxPoint="maxPoint"/>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex pa-3>
            <div class="xs12 headline text-xs-center mb-3">
              Disciplines
              <v-btn v-if="!readonly" fab small color="primary" @click="dialog=true">
                <v-icon>add</v-icon>
              </v-btn>
            </div>
            <v-layout justify-space-around wrap>
              <v-flex
                md4
                lg3
                sm6
                xs12
                pa-1
                v-for="discipline in character.disciplines"
                v-bind:key="discipline.name"
              >
                <Discipline :discipline="discipline" :readonly="readonly"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item>Background</v-tab-item>
      <v-tab-item>Story</v-tab-item>
    </v-tabs-items>
    <AddDiscipline :character="character" :dialog="dialog" @close="dialog=false"/>
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
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
      style="position: absolute"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary" dark fab>
          <v-icon>more_vert</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn v-if="readonly && !fighting" color="primary" @click="fighting = true">Fight</v-btn>
      <v-btn v-if="readonly && fighting" @click="fighting = false">End Fight</v-btn>
      <v-btn @click="readonly= false" v-if="readonly && !fighting">Edit</v-btn>
      <v-btn @click="save" v-if="!readonly && !fighting">Save</v-btn>
      <v-btn @click="loadCharacter" v-if="!readonly && !fighting">Undu</v-btn>
      <v-btn @click="killOrResumeCharacter(false)">Kill</v-btn>
      <v-btn @click="close">Close</v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import client from "../../services/client";
import Capacity from "./Capacity.vue";
import Discipline from "./Discipline.vue";
import AddDiscipline from "./AddDiscipline.vue";
export default {
  components: {
    Capacity,
    Discipline,
    AddDiscipline
  },
  data() {
    return {
      readonly: true,
      fighting: false,
      loaded: false,
      dialog: false,
      maxPoint: 5,
      character: {
        characteristics: {},
        mainInformation: {},
        health: {},
        willPower: {},
        attributes: {},
        skills: {},
        disciplines: [],
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
      fab: false
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
      this.readonly = true;
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
      if (!this.fighting) {
        this.snackbar.text = "Save successfully";
        this.snackbar.enabled = true;
      }
      this.readonly = true;
    },
    async killOrResumeCharacter(alive) {
      let res = await this.$confirm(
        `Do you really want to ${alive ? "resume" : "kill"} ${
          this.character.name
        }?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        await client.put(`api/characters/${this.character._id}`, { alive });
        this.character.alive = alive;
      }
    }
  },
  created() {
    this.loadCharacter();
  },
  computed: {
    damage: {
      get() {
        if (this.character && this.character.health) {
          return (
            this.character.health.superficialDamage +
            this.character.health.aggravatedDamage
          );
        }
        return 0;
      },
      set() {}
    },
    aggravatedPool: {
      get() {
        if (this.character && this.character.health) {
          return (
            this.character.health.pool - this.character.health.superficialDamage
          );
        }
        return 0;
      }
    },
    superficialPool: {
      get() {
        if (this.character && this.character.health) {
          return (
            this.character.health.pool - this.character.health.aggravatedDamage
          );
        }
        return 0;
      }
    }
  },
  watch: {
    fighting: {
      handler: function(val) {
        if (val) {
          this.snackbar.text = "Fight started - auto-save enable";
        } else {
          this.snackbar.text = "Fight ended - auto-save disable";
        }
        this.snackbar.enabled = true;
      }
    },
    character: {
      handler: function() {
        if (this.fighting) {
          this.save();
        }
      },
      deep: true
    }
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
