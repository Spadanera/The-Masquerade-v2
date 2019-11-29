<template>
  <v-layout justify-start>
    <v-flex style="padding-top: 10px; margin-right: 15px;" shrink>
      <span class="subheading text-truncat">{{$ml.get(capacity.name)}}</span>
    </v-flex>
    <v-flex style="padding-right: 10px;">
      <v-text-field
        :readonly="readonly"
        style="padding-top: 0; margin-top: 0; font-style: italic; font-size: smaller;"
        ref="name"
        v-model="capacity.speciality"
        label
        :placeholder="$ml.get('special')"
      ></v-text-field>
    </v-flex>
    <v-flex style="padding-top: 15px; padding-right: 10px; min-width: 108px; width: 108px;" shrink>
      <div v-if="internalFighting">
        <v-rating
          v-model="capacity.points"
          empty-icon="radio_button_unchecked"
          full-icon="radio_button_checked"
          background-color="secondary"
          clearable
          dense
          small
          :length="capacity.points"
          :readonly="true"
          style="float: left"
        ></v-rating>
        <v-rating
          v-model="capacity.fightingPoint"
          empty-icon="radio_button_unchecked"
          full-icon="radio_button_checked"
          background-color="secondary"
          clearable
          dense
          small
          color="secondary"
          :length="fightingPool"
          :readonly="false"
          style="display: flex; flex-wrap: wrap;"
        ></v-rating>
      </div>
      <v-rating
        v-model="capacity.points"
        empty-icon="radio_button_unchecked"
        full-icon="radio_button_checked"
        background-color="secondary"
        clearable
        dense
        small
        :length="maxPoint"
        :readonly="readonly"
        v-else
      ></v-rating>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    capacity: Object,
    readonly: Boolean,
    maxPoint: Number,
    fighting: Boolean
  },
  data() {
    return {
      componentCapacity: this.capacity
    };
  },
  methods: {
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
  },
  computed: {
    fightingPool: {
      get() {
        return 10 - this.capacity.points;
      }
    },
    internalFighting: {
      get() {
        return (
          ["strength", "dexterity", "stamina"].indexOf(this.capacity.name) >
            -1 && this.fighting
        );
      }
    },
    maxPointFighting: {
      get() {
        if (this.internalFighting) {
          return this.fighting ? 10 : this.maxPoint;
        } else return this.maxPoint;
      },
      set() {}
    }
  }
};
</script>

<style>

</style>
