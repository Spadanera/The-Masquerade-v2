<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
      v-touch="{ left: () => ownNavVisible = false }"
    >
      <v-list subheader three-line>
        <v-subheader class="headline">{{$ml.get("stories")}}</v-subheader>
        <v-skeleton-loader
          type="list-item-three-line"
          :loading="!loaded"
          transition="fade-transition"
        >
          <v-list-item-group v-model="index">
            <v-list-item v-for="(story, i) in stories" :key="i" @click="select(story)">
              <v-list-item-content>
                <v-list-item-title>{{story.name}}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-if="story.onGoing"
                    label
                    color="primary"
                    text-color="white"
                    small
                  >{{$ml.get("onGoing")}}</v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <div v-html="story.shortDescription"></div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-skeleton-loader>
      </v-list>
      <v-btn
        color="primary"
        style="padding-top: 2px;"
        @click="dialog=true"
        v-if="loaded"
      >{{$ml.get("createStory")}}</v-btn>
    </v-navigation-drawer>
    <transition name="fade" mode="out-in">
      <router-view
        :key="$route.fullPath"
        :onGoingStory="onGoingStory"
        @ongoing="getStories"
        :sessionOnGoing="sessionOnGoing"
      ></router-view>
    </transition>
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
      onGoingStory: false,
      index: 0,
      loaded: false
    };
  },
  props: {
    navVisible: Boolean,
    sessionOnGoing: Boolean,
    storyService: Object,
    isPlayer: Boolean
  },
  methods: {
    async getStories(storyId) {
      storyId = storyId || this.$route.params.storyid;
      this.stories = await this.storyService.getStories(this.$route.params.id);
      if (this.stories.find(s => s.onGoing)) {
        this.onGoingStory = true;
      } else {
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
      window.setTimeout(() => (this.loaded = true), 300);
    },
    select(story, notToCloseNav) {
      this.index = this.stories.findIndex(s => s._id === story._id);
      if (this.$route.params.storyid !== story._id) {
        this.$router
          .push(
            `/${this.isPlayer ? "player" : "story-teller"}/chronicle/${
              this.$route.params.id
            }/stories/${story._id}`
          )
          .catch(() => {});
      }
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
