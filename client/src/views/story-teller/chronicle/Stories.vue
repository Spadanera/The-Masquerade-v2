<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="navVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
    >
      <v-list
        subheader
        three-line
      >
        <v-subheader class="headline">Stories</v-subheader>
        <template v-for="(story) in stories">
          <v-list-tile :key="story._id" @click="select(story)">
            <v-list-tile-content>
              <v-list-tile-title v-html="story.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="story.shortDescription"></v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-element primary" v-if="story._id === $route.params.storyid"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" style="padding-top: 2px;" @click="dialog=true">Create Story</v-btn>
    </v-navigation-drawer>
    <router-view></router-view>
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
  props: {
    navVisible: Boolean
  },
  methods: {
    async getStories(storyId) {
      let response = await client.get(
        `/api/stories/all/${this.$route.params.id}`
      );
      this.stories = response.data;
      if (this.stories.length) {
        let find = this.stories.find(s => s._id === storyId);
        if (find) {
          this.select(find);
        }
        else {
          this.select(this.stories[0]);
        }
      }
    },
    select(story) {
      this.$router.push(
        `/chronicle/${this.$route.params.id}/stories/${story._id}`
      );
    },
    async storyAdded() {
      await this.getStories();
    }
  },
  created(storyId) {
    this.getStories(storyId);
  }
};
</script>

<style>
.selected-story {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  height: 100%;
  width: 5px;
  left: 0;
}
</style>
