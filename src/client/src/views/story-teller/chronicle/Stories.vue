<template>
  <v-layout align-start justify-start fill-height>
    <v-flex
      shrink
      style="height: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); background-color: white"
    >
      <v-list style="width: 400px" subheader three-line>
        <v-subheader class="headline">Stories</v-subheader>
        <template v-for="(story, index) in stories">
          <v-list-tile :key="story._id" @click="select(index)">
            <v-list-tile-content>
              <v-list-tile-title v-html="story.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="story.shortDescription"></v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-story primary" v-if="selectedIndex === index"></div>
          </v-list-tile>
          <!-- <v-divider :key="index"></v-divider> -->
        </template>
      </v-list>
      <v-btn color="primary" @click="dialog=true">Create Story</v-btn>
    </v-flex>
    <v-flex grow style="height: 100%">
      <v-layout fill-height fluid>
        <v-flex></v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-flex>
    <AddStory
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="storyAdded"
      @close="dialog = false"
    />
  </v-layout>
</template>

<script>
import client from "../../../services/client";
import AddStory from "../../../components/stories/AddStory.vue";
export default {
  components: {
    AddStory
  },
  data() {
    return {
      stories: [],
      dialog: false,
      selectedIndex: -1
    };
  },
  methods: {
    async getStories() {
      let response = await client.get(
        `/api/stories/all/${this.$route.params.id}`
      );
      this.stories = response.data;
    },
    select(index) {
      this.selectedIndex = index;
    },
    async storyAdded() {
      await this.getStories();
      if (this.selectedIndex > -1) {
        this.selectedIndex++;
      }
    }
  },
  created() {
    this.getStories();
  }
};
</script>

<style>
.selected-story {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  right: 0;
}
</style>
