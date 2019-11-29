<template>
  <v-form autocomplete="off" ref="form" v-model="valid">
    <v-text-field v-model="chronicle.name" :label="$ml.get('name')" required></v-text-field>
    <GoogleMapsAutocomplete
              @input="setPlace"
              v-model="currentPlace"
              :label="$ml.get('enterAnAddress')"
            />
    <v-textarea
      v-model="chronicle.shortDescription"
      :label="$ml.get('shortDescription')"
      name="description"
      auto-grow
      required
      rows="1"
    ></v-textarea>
  </v-form>
</template>

<script>
import GoogleMapsAutocomplete from "../../components/places/GoogleMapsAutocomplete";
export default {
  components: {
    GoogleMapsAutocomplete
  },
  name: "ChronicleForm",
  data() {
    return {
      valid: true,
      chronicle: {},
      currentPlace: {}
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // call action
        await this.Service.chronicleService.createChronicle(this.chronicle);
        this.$emit("submitted");
      }
    },
    setPlace(place) {
      this.chronicle.gmaps = JSON.stringify(place);
    }
  }
};
</script>

<style>
</style>
