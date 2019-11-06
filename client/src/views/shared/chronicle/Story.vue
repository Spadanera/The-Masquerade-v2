<template>
  <v-layout fluid fill-height row wrap style="overflow: auto">
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <div class="headline">{{ story.name }}</div>
              <span>{{ story.shortDescription }}</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-text>
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
          <span class="headline">Sessions timeline</span>
        </v-card-title>
        <v-card-text>
          <v-timeline dense>
            <v-timeline-item v-for="session in story.sessions" v-bind:key="session._id">
              <div class="py-3">
                <h2 class="headline font-weight-light mb-3">
                  {{moment(session.sessionDate).format("YYYY-MM-DD")}}
                  <v-btn @click="viewSession(session._id)">Details</v-btn>
                </h2>
                <div>{{ session.globalNote }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn @click="endStory(story._id)" v-if="story.onGoing && !sessionOnGoing" color="primary" dark fixed bottom right>
      <span>End story</span>
    </v-btn>
    <v-btn @click="setOnGoing(story._id)" v-if="!story.onGoing && !onGoingStory && !sessionOnGoing" color="primary" dark fixed bottom right>
      <span>Set as on going story</span>
    </v-btn>
    <v-bottom-sheet v-model="sessionSheet">
      <SessionForm :readonly="true" :sessionid="selectedSession" @close="sessionSheet=false" />
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
      selectedSession: ""
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
      storyId = storyId || this.$route.params.storyid;
      this.story = await this.Service.storyService.getStory(storyId);
      this.story.sessions = await this.Service.sessionService.getSessions(
        storyId
      );
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
        await this.Service.storyService.startStory(this.$route.params.id, storyId);
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
    this.getStory(to.params.storyid);
    next();
  }
};
</script>

<style>
</style>
