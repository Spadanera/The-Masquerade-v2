<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
    >
      <v-list subheader three-line>
        <v-subheader class="headline">Stories</v-subheader>
        <template v-for="(story) in stories">
          <v-list-tile :key="story._id" @click="select(story)">
            <v-list-tile-content>
              <v-list-tile-title>{{story.name}}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-chip v-if="story.onGoing" label color="primary" text-color="white" small>On Going</v-chip>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <div v-html="story.shortDescription"></div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <div class="selected-element primary" v-if="story._id === $route.params.storyid"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" style="padding-top: 2px;" @click="dialog=true">Create Story</v-btn>
    </v-navigation-drawer>
    <router-view :onGoingStory="onGoingStory" @ongoing="getStories" :sessionOnGoing="sessionOnGoing"></router-view>
    <AddStory
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="storyAdded"
      @close="dialog = false"
    />
  </v-layout>
</template>

<script>
import AddStory from "../../../components/stories/AddStory.vue";
export default {
  components: {
    AddStory
  },
  data() {
    return {
      stories: [],
      dialog: false,
      selectedIndex: -1,
      onGoingStory: false
    };
  },
  props: {
    navVisible: Boolean,
    sessionOnGoing: Boolean
  },
  methods: {
    async getStories(storyId) {
      // input storyId
      this.stories = await this.Service.storyService.getStories(
        this.$route.params.id
      );
      if (this.stories.find(s => s.onGoing)) {
        this.onGoingStory = true;
      }
      else {
        this.onGoingStory = false;
      }
      this.stories.sort((a, b) => {
        if (a.onGoing) {
          return -1;
        }
        if (b.onGoing) {
          return 1;
        }
        return a.createdAt > b.createdAt ? -1 : 1;
      });
      if (this.stories.length) {
        let find = this.stories.find(s => s._id === storyId);
        if (find) {
          this.select(find, true);
        } else {
          this.select(this.stories[0], true);
        }
      }
    },
    select(story, notToCloseNav) {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/stories/${story._id}`
      );
      if (!notToCloseNav) {
        this.ownNavVisible = false;
      }
    },
    async storyAdded(storyId) {
      await this.getStories(storyId);
    }
  },
  created() {
    this.getStories();
  },
  watch: {
    navVisible: function(newValue) {
      this.ownNavVisible = newValue;
    }
  },
  computed: {
    ownNavVisible: {
      get() {
        return this.navVisible || this.$vuetify.breakpoint.lgAndUp;
      },
      set(val) {
        if (!val) {
          this.$emit("closenavbar");
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getStories(to.params.storyid);
    next();
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
