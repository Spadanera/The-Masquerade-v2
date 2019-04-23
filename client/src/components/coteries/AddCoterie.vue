<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Coterie</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="coterie.name" label="Name" required></v-text-field>
            <v-textarea
              v-model="coterie.description"
              label="Short Description"
              name="description"
              auto-grow
              required
              rows="1"
            ></v-textarea>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeModal">Dismiss</v-btn>
        <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import client from '../../services/client';
export default {
  name: "AddCoterie",
  props: {
    dialog: Boolean,
    chronicleId: String
  },
  data() {
    return {
      coterie: {},
      valid: true
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        let coterie = await client.post(`/api/coteries/${this.chronicleId}`, this.coterie);
        this.$emit("submitted", coterie._id);
        this.$emit("close", false);
      }
    }
  }
};
</script>

<style>
</style>
