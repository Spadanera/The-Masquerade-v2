<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Coterie</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form" v-model="valid">
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
        <v-btn color="blue darken-1" text @click="closeModal">{{$ml.get("dismiss")}}</v-btn>
        <v-btn color="blue darken-1" text @click="submit">{{$ml.get("save")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
    clearCoterie() {
      this.coterie.name = "";
      this.coterie.description = "";
    },
    closeModal() {
      this.$emit("close", false);
      this.clearCoterie();
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.coterie = await this.Service.coterieService.createGroup(this.chronicleId, this.coterie);
        this.$emit("submitted", this.coterie._id);
        this.$emit("close", false);
        this.clearCoterie();
      }
    }
  }
};
</script>

<style>
</style>
