<template>
  <v-layout column>
    <v-flex pa-3>
      <v-card>
        <v-card-text>
          <v-layout row wrap justify-space-around justify-center>
            <v-flex shrink xs12 sm6 md3>
              <div class="body-1 text-center mb-2">{{$ml.get('health')}}</div>
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
            <v-flex shrink xs12 sm6 md3>
              <div class="body-1 text-center mb-2">{{$ml.get('willPower')}}</div>
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
            <v-flex shrink xs12 sm6 md3>
              <div class="body-1 text-center mb-2">{{$ml.get('humanity')}}</div>
              <v-rating
                v-model="character.humanity"
                empty-icon="radio_button_unchecked"
                full-icon="radio_button_checked"
                clearable
                class="text-center"
                dense
                small
                background-color="secondary"
                :length="10"
                :readonly="readonly"
              ></v-rating>
            </v-flex>
            <v-flex shrink xs12 sm6 md3>
              <div class="body-1 text-center mb-2">{{$ml.get('bloodPotency')}}</div>
              <v-rating
                v-model="character.bloodPotency"
                empty-icon="radio_button_unchecked"
                full-icon="radio_button_checked"
                clearable
                class="text-center"
                dense
                small
                background-color="secondary"
                :length="10"
                :readonly="readonly"
              ></v-rating>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-layout row justify-space-around justify-center wrap>
            <v-flex xs12 md6>
              <v-layout justify-space-around justify-center>
                <v-flex shrink ma-2>
                  <v-select
                    :items="$root.clans"
                    :label="$ml.get('clan')"
                    v-model="character.mainInformation.clan"
                    :disable="readonly"
                    :readonly="readonly"
                  ></v-select>
                </v-flex>
                <v-flex shrink ma-2>
                  <v-select
                    :items="$root.generations"
                    :label="$ml.get('generation')"
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
                    :label="$ml.get('resonance')"
                  ></v-text-field>
                </v-flex>
                <v-flex shrink ma-2>
                  <div class="subheading text-center mb-2">{{$ml.get('hunger')}}</div>
                  <v-rating
                    v-model="character.hunger"
                    empty-icon="radio_button_unchecked"
                    full-icon="radio_button_checked"
                    clearable
                    class="text-center"
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
      <!-- <div class="xs12 headline text-center mb-3">Attributes</div> -->
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex
              md4
              sm12
              v-for="(value, groupName) in character.attributes"
              v-bind:key="groupName"
            >
              <div class="title text-center">{{ $ml.get(groupName) }}</div>
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
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex pa-3>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md4 sm12 v-for="(value, groupName) in character.skills" v-bind:key="groupName">
              <div v-for="(attribute, propertyName) in value" v-bind:key="propertyName">
                <Capacity :capacity="attribute" :readonly="readonly" :maxPoint="maxPoint"/>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex pa-3>
      <div class="xs12 headline text-center mb-3">
        {{$ml.get('disciplines')}}
        <v-fab-transition>
        <v-btn v-show="!readonly" fab small color="primary" @click="dialog=true">
          <v-icon>add</v-icon>
        </v-btn>
        </v-fab-transition>
      </div>
      <v-layout justify-space-around wrap>
        <v-flex
          md6
          lg4
          sm12
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
