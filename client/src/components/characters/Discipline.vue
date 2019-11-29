<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{configDiscipline.label}}</span>
      <v-spacer></v-spacer>
      <v-rating
        v-model="discipline.points"
        empty-icon="radio_button_unchecked"
        full-icon="radio_button_checked"
        clearable
        class="text-center"
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
        <v-list-item v-for="(power, index) in discipline.powers" v-bind:key="index">
          <v-select
            style="width: 50px; margin-right: 15px;"
            v-model="power.level"
            :items="levelRange"
            :disable="readonly"
            :readonly="readonly"
          ></v-select>
          <v-select
            item-text="label"
            item-value="key"
            :items="configDiscipline.powers[power.level - 1]"
            :label="$ml.get('discipline')"
            :disable="readonly"
            :readonly="readonly"
            v-model="power.power"
          ></v-select>
        </v-list-item>
      </v-list>
      <v-fab-transition>
        <v-btn color="alert" @click="remove" v-show="!readonly" fab dark small absolute bottom left>
          <v-icon>clear</v-icon>
        </v-btn>
      </v-fab-transition>
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
      configDiscipline: {},
      levelRange: []
    };
  },
  methods: {
    async remove() {
      let res = await this.$confirm(
        this.$ml.with("0", this.configDiscipline.label).get("confirmDeleteDiscipline"),
        {
          title: this.$ml.get("warning")
        }
      );
      if (res) {
        this.$parent.character.disciplines = this.$parent.character.disciplines.filter(d => d.name !== this.discipline.name);
      }
    }
  },
  created() {
    for (let k = 1; k <= this.discipline.points; k++) {
      this.levelRange.push(k);
    }
    this.configDiscipline = this.$root.disciplines.find(
      d => d.key === this.discipline.name
    );
    this.discipline.powers = this.discipline.powers || [];
    for (
      let i = this.discipline.powers.length + 1;
      i <= this.discipline.points;
      i++
    ) {
      this.discipline.powers.push({
        level: i,
        power: ""
      });
    }
  },
  watch: {
    "discipline.points": function(newValue) {
      let newPowers = [];
      this.levelRange = [];
      for (let i = 0; i < newValue; i++) {
        if (i < this.discipline.powers.length) {
          newPowers.push(this.discipline.powers[i]);
        } else {
          newPowers.push({
            level: i + 1,
            power: ""
          });
        }
        this.levelRange.push(i + 1);
      }
      this.discipline.powers = newPowers;
    }
  }
};
</script>

<style>
</style>
