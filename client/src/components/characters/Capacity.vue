<template>
  <v-layout justify-start>
    <v-flex style="padding-top: 10px; margin-right: 15px;" shrink>
      <span class="subheading">{{capitalize(capacity.name)}}</span>
    </v-flex>
    <v-flex style="padding-right: 10px;">
      <v-text-field :readonly="readonly" style="padding-top: 0; margin-top: 0; font-style: italic; font-size: smaller;" ref="name" v-model="capacity.speciality" label placeholder="special"></v-text-field>
    </v-flex>
    <v-flex style="padding-top: 15px; padding-right: 10px; min-width: 105px" shrink>
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
      ></v-rating>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    capacity: Object,
    readonly: Boolean,
    maxPoint: Number
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
  }
};
</script>

<style>
</style>
