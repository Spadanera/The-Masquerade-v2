<template>
  <v-layout fluid fill-height wrap style="overflow: auto">
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-card>
        <v-card-title class="headline">{{ story.name }}</v-card-title>
        <v-card-subtitle>{{ story.shortDescription }}</v-card-subtitle>
        <v-card-text style="padding: 0;">
          <v-tabs centered grow slider-color="primary" v-model="selectedTab">
            <v-tab>Public Story</v-tab>
            <v-tab>Private Story</v-tab>
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
          <v-btn color="primary" @click="startEditing" v-if="!editing">Edit</v-btn>
          <v-btn @click="saveStory()" v-if="editing">Save</v-btn>
          <v-btn @click="editing=false" v-if="editing">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex id="sessions" xs12 sm12 md12 lg6 pa-3>
      <v-card>
        <v-card-title>
          <v-layout wrap>
            <v-flex ref="headline" xs12 sm6 md8 lg6 xl7>
              <span class="headline">Sessions timeline</span>
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
                  <v-btn @click="viewSession(session._id)">Details</v-btn>
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
    </v-flex>
    <v-btn
      @click="endStory(story._id)"
      v-if="story.onGoing && !sessionOnGoing"
      color="primary"
      dark
      fixed
      bottom
      right
    >
      <span>End story</span>
    </v-btn>
    <v-btn
      @click="setOnGoing(story._id)"
      v-if="!story.onGoing && !onGoingStory && !sessionOnGoing"
      color="primary"
      dark
      fixed
      bottom
      right
    >
      <span>Set as on going story</span>
    </v-btn>
    <v-bottom-sheet v-model="sessionSheet">
      <SessionForm
        :readonly="true"
        :sessionid="selectedSession"
        @close="sessionSheet=false"
        @complete="getStory"
        :search="search ? search.split(' ') : []"
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
    sessionOnGoing: Boolean
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
      sessionSheet: false,
      selectedSession: "",
      search: ""
    };
  },
  methods: {
    startEditing() {
      this.editStory =
        this.selectedTab === 1
          ? this.story.privateStory
          : this.story.publicStory;
      this.editing = true;
    },
    async saveStory() {
      let input = {};
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
      this.story = await this.Service.storyService.getStory(storyId);
      this.getSessions(storyId);
    },
    async getSessions(storyId, clear) {
      if (clear) {
        this.search = "";
      }
      if (this.search) {
        this.story.sessions = await this.Service.sessionService.searchSessions(
          this.search,
          this.$route.params.id,
          storyId
        );
      } else {
        this.story.sessions = await this.Service.sessionService.getSessions(
          storyId
        );
      }
      this.$refs.headline.click();
    },
    async viewSession(sessionId) {
      this.selectedSession = sessionId;
      this.sessionSheet = true;
    },
    async setOnGoing(storyId) {
      let res = await this.$confirm(
        `Do you really want remove start this story?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        await this.Service.storyService.startStory(
          this.$route.params.id,
          storyId
        );
        this.getStory();
        this.$emit("ongoing");
      }
    },
    async endStory(storyId) {
      let res = await this.$confirm(
        `Do you really want remove end this story?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        await this.Service.storyService.closeStory(storyId);
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
