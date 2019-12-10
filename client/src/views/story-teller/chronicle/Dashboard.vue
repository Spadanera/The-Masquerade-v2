<template>
  <v-layout fluid fill-height wrap style="overflow: auto;">
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-skeleton-loader
        type="article, divider, list-item-three-line, actions"
        :loading="!loaded"
      >
        <v-card>
          <v-card-title class="headline">{{ $parent.chronicle.name }}</v-card-title>
          <v-card-subtitle>{{ $parent.chronicle.shortDescription }}</v-card-subtitle>
          <v-card-text style="padding: 0;">
            <v-tabs centered grow slider-color="primary" v-model="selectedTab">
              <v-tab>{{$ml.get("publicStory")}}</v-tab>
              <v-tab v-if="!isPlayer">{{$ml.get("privateStory")}}</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text v-if="!editing" v-html="$parent.chronicle.publicStory"></v-card-text>
                  <ckeditor
                    :editor="editor"
                    v-model="editStory"
                    :config="editorConfig"
                    v-else
                    tag-name="textarea"
                  ></ckeditor>
                </v-card>
              </v-tab-item>
              <v-tab-item v-if="!isPlayer">
                <v-card flat>
                  <v-card-text v-html="$parent.chronicle.privateStory" v-if="!editing"></v-card-text>
                  <ckeditor
                    :editor="editor"
                    v-model="editStory"
                    :config="editorConfig"
                    v-else
                    tag-name="textarea"
                  ></ckeditor>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
          <v-card-actions v-if="!isPlayer">
            <v-spacer></v-spacer>
            <v-btn text @click="startEditing" v-if="!editing">{{$ml.get("edit")}}</v-btn>
            <v-btn text @click="saveStory()" v-if="editing">{{$ml.get("save")}}</v-btn>
            <v-btn text @click="editing=false" v-if="editing">{{$ml.get("dismiss")}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-flex>
    <v-flex id="sessions" xs12 sm12 md12 lg6 pa-3>
      <v-skeleton-loader
        type="card-heading, list-item, list-item-avatar-three-line"
        :loading="!loadedSessions"
      >
        <v-card>
          <v-card-title>
            <v-layout wrap>
              <v-flex xs12 sm6 md8 lg6 xl7>
                <span class="headline">{{$ml.get("sessionsTimeline")}}</span>
              </v-flex>
              <v-flex xs12 sm6 md4 lg6 xl5>
                <v-form autocomplete="off" @submit.prevent="getSessions()">
                  <v-text-field
                    @click:clear="getSessions(true)"
                    solo
                    prepend-inner-icon="search"
                    clearable
                    v-model="search"
                    @click:prepend-inner="getSessions()"
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-timeline dense v-for="story in stories" v-bind:key="story._id">
              <div class="title text-center">{{story.name}}</div>
              <v-timeline-item v-for="session in story.sessions" v-bind:key="session._id">
                <div class="py-3">
                  <h2 class="headline font-weight-light mb-3">
                    {{moment(session.sessionDate).format("YYYY-MM-DD")}}
                    <v-btn text @click="viewSession(session._id)">{{$ml.get("details")}}</v-btn>
                  </h2>
                  <text-highlight
                    :queries="search ? search.split(' ') : []"
                  >{{ session.globalNote }}</text-highlight>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-flex>
    <v-bottom-sheet v-model="sessionSheet">
      <SessionForm
        :readonly="true"
        :sessionid="selectedSession"
        @close="sessionSheet=false"
        @complete="getStories"
        :search="search ? search.split(' ') : []"
        :isPlayer="isPlayer"
        :sessionService="sessionService"
      />
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SessionForm from "../../../components/live/SessionForm";
export default {
  components: {
    SessionForm
  },
  props: {
    loaded: Boolean,
    sessionService: Object,
    storyService: Object,
    isPlayer: Boolean
  },
  data() {
    return {
      stories: [],
      editing: false,
      editStory: "",
      selectedTab: 0,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      sessionSheet: false,
      selectedSession: "",
      search: "",
      loadedSessions: false
    };
  },
  methods: {
    startEditing() {
      this.editStory =
        this.selectedTab === 1
          ? this.$parent.chronicle.privateStory
          : this.$parent.chronicle.publicStory;
      this.editing = true;
    },
    async saveStory() {
      let input = {};
      if (this.selectedTab === 1) {
        input.privateStory = this.editStory;
      } else {
        input.publicStory = this.editStory;
      }
      await this.Service.chronicleService.updateChronicle(
        this.$route.params.id,
        input
      );
      this.$emit("updated");
      this.editing = false;
    },
    async getStories() {
      this.stories = await this.storyService.getStories(
        this.$route.params.id
      );
      await this.getSessions();
      this.sessionSheet = false;
    },
    async getSessions(clear) {
      this.loadedSessions = false;
      if (clear) {
        this.search = "";
      }
      let storyLenght = this.stories.length;
      let storyLoaded = 0;
      for (let i = 0; i < storyLenght; i++) {
        if (this.search) {
          let story = this.stories[i];
          this.sessionService
            .searchSessions(
              this.search,
              this.$route.params.id,
              this.stories[i]._id
            )
            .then(response => {
              story.sessions = response;
              storyLoaded++;
              this.loadedSessions = storyLoaded === storyLenght;
            });
        } else {
          let story = this.stories[i];
          this.sessionService
            .getSessions(this.stories[i]._id)
            .then(response => {
              story.sessions = response;
              storyLoaded++;
              this.loadedSessions = storyLoaded === storyLenght;
            });
        }
      }
    },
    async viewSession(sessionId) {
      this.selectedSession = sessionId;
      this.sessionSheet = true;
    }
  },
  watch: {
    selectedTab() {
      this.editing = false;
    }
  },
  created() {
    this.getStories();
  }
};
</script>

<style>
</style>
