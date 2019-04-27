<template>
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
                    :disable="readonly"
                    :readonly="readonly"
                  ></v-select>
                </v-flex>
                <v-flex shrink ma-2>
                  <v-select
                    :items="$root.generations"
                    label="Generation"
                    v-model="character.mainInformation.generation"
                    :disable="readonly"
                    :readonly="readonly"
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
            <v-flex md4 sm12 v-for="(value, groupName) in character.skills" v-bind:key="groupName">
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
    <AddDiscipline :character="character" :dialog="dialog" @close="dialog=false"/>
  </v-layout>
</template>

<script>
import Capacity from "./Capacity.vue";
import Discipline from "./Discipline.vue";
import AddDiscipline from "./AddDiscipline.vue";
export default {
  components: {
    Capacity,
    Discipline,
    AddDiscipline
  },
  props: {
    character: Object,
    readonly: Boolean,
    fighting: Boolean
  },
  data() {
    return {
      dialog: false,
      maxPoint: 5
    };
  },
  methods: {
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
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
  }
};
</script>

<style>
</style>
