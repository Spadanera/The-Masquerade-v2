<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Chronicle</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <ChronicleForm @submitted="created" ref="form"/>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">{{$ml.get("dismiss")}}</v-btn>
        <v-btn color="blue darken-1" text @click="submitForm">{{$ml.get("save")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ChronicleForm from "./ChronicleForm.vue";
export default {
  name: "AddChronicle",
  components: {
    ChronicleForm
  },
  props: {
    dialog: Boolean
  },
  data() {
    return {
      chronicle: {}
    };
  },
  methods: {
    created () {
      this.$emit("submitted");
      this.$emit("close", false);
    },
    closeModal () {
      this.$emit("close", false);
    },
    submitForm () {
      this.$refs.form.submit();
    }
  }
};
</script>

<style>
</style>
