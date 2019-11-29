<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{$ml.get("createNewStory")}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form" v-model="valid">
            <v-text-field v-model="story.name" label="Name" required></v-text-field>
            <v-textarea
              v-model="story.shortDescription"
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
  name: "AddStory",
  props: {
    dialog: Boolean,
    chronicleId: String
  },
  data() {
    return {
      story: {},
      valid: true
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        await this.Service.storyService.createStory(this.chronicleId, this.story);
        this.$emit("submitted", this.story._id);
        this.$emit("close", false);
        this.story = {};
      }
    }
  }
};
</script>

<style>
</style>
