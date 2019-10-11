<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="chronicle.name" label="Name" required></v-text-field>
    <v-textarea
      v-model="chronicle.shortDescription"
      label="Short Description"
      name="description"
      auto-grow
      required
      rows="1"
    ></v-textarea>
  </v-form>
</template>

<script>
export default {
  name: "ChronicleForm",
  data() {
    return {
      valid: true,
      chronicle: {}
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // call action
        this.Service.chronicleService.createChronicle(this.chronicle);
        this.$emit("submitted");
      }
    }
  }
};
</script>

<style>
</style>
