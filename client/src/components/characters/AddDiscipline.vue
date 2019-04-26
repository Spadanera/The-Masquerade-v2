<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>Add Discipline</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid">
            <v-select
              item-text="value"
              item-value="key"
              :items="disciplines"
              label="Discipline"
              v-model="discipline"
            ></v-select>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeModal">Dismiss</v-btn>
        <v-btn color="blue darken-1" flat @click="submit">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      discipline: "",
      valid: false
    };
  },
  props: {
    dialog: Boolean,
    character: Object
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    submit() {
      this.character.disciplines.push({
        name: this.discipline,
        points: 0
      });
      this.$emit("close", false);
    }
  },
  computed: {
    disciplines: {
      get() {
        return this.$root.disciplines.filter(d => {
          return this.character.disciplines.find(di => di.name === d.key);
        });
      }
    }
  }
};
</script>

<style>
</style>
