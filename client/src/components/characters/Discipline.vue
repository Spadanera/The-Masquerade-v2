<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        {{disciplineName}}
      </span>
      <v-spacer></v-spacer>
        <v-rating
          v-model="discipline.points"
          empty-icon="radio_button_unchecked"
          full-icon="radio_button_checked"
          clearable
          class="text-xs-center"
          dense
          small
          background-color="secondary"
          :length="5"
          :readonly="readonly"
          style="min-width: 108px"
        ></v-rating>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-tile v-for="speciality in discipline.specialities" v-bind:key="speciality.level">
            ciao
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Discipline",
  props: {
    discipline: Object,
    readonly: Boolean
  },
  data() {
    return {
      disciplineName: ""
    };
  },
  created() {
    this.disciplineName = this.$root.disciplines.find(
      d => d.key === this.discipline.name
    ).value;
    this.discipline.specialities = this.discipline.specialities || [];
    for (let i = this.discipline.specialities.length + 1; i <= this.discipline.points; i++) {
        this.discipline.specialities.push({
            level: i,
            speciality: ""
        });
    }
  },
  watch: {
    "discipline.point": function(newValue, oldValue) {}
  }
};
</script>

<style>
</style>
