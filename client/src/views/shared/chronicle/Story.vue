<template>
  <v-layout fluid fill-height wrap style="overflow: auto">
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-skeleton-loader type="article, divider, list-item-three-line, actions" :loading="!loaded">
        <v-card>
          <v-card-title class="headline">
            <span v-if="!editing">{{ story.name }}</span>
            <v-text-field v-else v-model="name"></v-text-field>
          </v-card-title>
          <v-card-subtitle>
            <span v-if="!editing">{{ story.shortDescription }}</span>
            <v-textarea
              auto-grow
              v-model="shortDescription"
              clearable
              rows="1"
              v-else
            />
          </v-card-subtitle>
          <v-card-text style="padding: 0;">
            <v-tabs centered grow slider-color="primary" v-model="selectedTab">
              <v-tab>{{$ml.get("publicStory")}}</v-tab>
              <v-tab>{{$ml.get("privateStory")}}</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text v-if="!editing" v-html="story.publicStory"></v-card-text>
                  <ckeditor
                    :editor="editor"
                    v-model="editStory"
                    :config="editorConfig"
                    v-else
                    tag-name="textarea"
                  ></ckeditor>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text v-html="story.privateStory" v-if="!editing"></v-card-text>
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
          <v-card-actions>
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
              <v-flex ref="headline" xs12 sm6 md8 lg6 xl7>
                <span class="headline" style="word-break: break-word;">{{$ml.get("sessionsTimeline")}}</span>
              </v-flex>
              <v-flex xs12 sm6 md4 lg6 xl5>
                <v-form autocomplete="off" @submit.prevent="getSessions(story._id)">
                  <v-text-field
                    @click:clear="getSessions(story._id, true)"
                    solo
                    prepend-inner-icon="search"
                    clearable
                    v-model="search"
                    @click:prepend-inner="getSessions(story._id)"
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item v-for="session in story.sessions" v-bind:key="session._id">
                <div class="py-3">
                  <h2 class="headline font-weight-light mb-3">
                    {{moment(session.sessionDate).format("YYYY-MM-DD")}}
                    <v-btn text @click="viewSession(session._id)">{{$ml.get("details")}}</v-btn>
                  </h2>
                  <div>
                    <text-highlight
                      :queries="search ? search.split(' ') : []"
                    >{{ session.globalNote }}</text-highlight>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-flex>
    <v-btn
      @click="endStory(story._id)"
      v-if="!isPlayer && story.onGoing && !sessionOnGoing"
      color="primary"
      dark
      fixed
      bottom
      :left="$vuetify.breakpoint.lgAndUp"
      :right="!$vuetify.breakpoint.lgAndUp"
    >
      <span>{{$ml.get("endStory")}}</span>
    </v-btn>
    <v-btn
      @click="setOnGoing(story._id)"
      v-if="!isPlayer && !story.onGoing && !onGoingStory && !sessionOnGoing"
      color="primary"
      dark
      fixed
      bottom
      :left="$vuetify.breakpoint.lgAndUp"
      :right="!$vuetify.breakpoint.lgAndUp"
    >
      <span>{{$ml.get("setOngoingStory")}}</span>
    </v-btn>
    <v-bottom-sheet v-model="sessionSheet">
      <SessionForm
        :readonly="true"
        :sessionid="selectedSession"
        @close="sessionSheet=false"
        @complete="getStory"
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
    onGoingStory: Boolean,
    sessionOnGoing: Boolean,
    storyService: Object,
    sessionService: Object,
    isPlayer: Boolean
  },
  data() {
    return {
      story: {},
      editing: false,
      editStory: "",
      selectedTab: 0,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      name: "",
      shortDescription: "",
      sessionSheet: false,
      selectedSession: "",
      search: "",
      loaded: false,
      loadedSessions: false
    };
  },
  methods: {
    startEditing() {
      this.editStory =
        this.selectedTab === 1
          ? this.story.privateStory
          : this.story.publicStory;
      this.name = this.story.name;
      this.shortDescription = this.story.shortDescription;
      this.editing = true;
    },
    async saveStory() {
      let input = {
        name: this.name,
        shortDescription: this.shortDescription
      };
      if (this.selectedTab === 1) {
        input.privateStory = this.editStory;
      } else {
        input.publicStory = this.editStory;
      }
      await this.Service.storyService.updateStory(
        this.$route.params.storyid,
        input
      );
      this.getStory();
      this.editing = false;
    },
    async getStory(storyId) {
      this.sessionSheet = false;
      storyId = storyId || this.$route.params.storyid;
      this.story = await this.storyService.getStory(storyId);
      this.getSessions(storyId);
      this.loaded = true;
    },
    async getSessions(storyId, clear) {
      if (clear) {
        this.search = "";
      }
      if (this.search) {
        this.story.sessions = await this.sessionService.searchSessions(
          this.search,
          this.$route.params.id,
          storyId
        );
      } else {
        this.story.sessions = await this.sessionService.getSessions(
          storyId
        );
      }
      this.loadedSessions = true;
      if (this.$refs.headline) {
        this.$refs.headline.click();
      }
    },
    async viewSession(sessionId) {
      this.selectedSession = sessionId;
      this.sessionSheet = true;
    },
    async setOnGoing(storyId) {
      let res = await this.$confirm(this.$ml.get("confirmStartStory"), {
        title: this.$ml.get("warning")
      });
      if (res) {
        await this.storyService.startStory(
          this.$route.params.id,
          storyId
        );
        this.getStory();
        this.$emit("ongoing");
      }
    },
    async endStory(storyId) {
      let res = await this.$confirm(this.$ml.get("confirmEndStory"), {
        title: this.$ml.get("warning")
      });
      if (res) {
        await this.storyService.closeStory(storyId);
        this.getStory();
        this.$emit("ongoing");
      }
    }
  },
  watch: {
    selectedTab() {
      this.editing = false;
    }
  },
  created() {
    this.getStory();
  },
  beforeRouteUpdate(to, from, next) {
    this.search = "";
    this.getStory(to.params.storyid);
    next();
  }
};
</script>

<style>
</style>
