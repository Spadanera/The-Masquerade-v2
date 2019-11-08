<template>
  <v-layout fluid fill-height row wrap style="overflow: auto">
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <div class="headline">{{ $parent.chronicle.name }}</div>
              <span>{{ $parent.chronicle.shortDescription }}</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-text>
          <v-tabs centered grow slider-color="primary" v-model="selectedTab">
            <v-tab>Public Story</v-tab>
            <v-tab>Private Story</v-tab>
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
            <v-tab-item>
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
            <v-flex xs12 sm6 md8 lg6 xl7>
              <span class="headline">Sessions timeline</span>
            </v-flex>
            <v-flex xs12 sm6 md4 lg6 xl5>
              <v-form @submit.prevent="getSessions()">
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
            <div class="title text-xs-center">{{story.name}}</div>
            <v-timeline-item v-for="session in story.sessions" v-bind:key="session._id">
              <div class="py-3">
                <h2 class="headline font-weight-light mb-3">
                  {{moment(session.sessionDate).format("YYYY-MM-DD")}}
                  <v-btn @click="viewSession(session._id)">Details</v-btn>
                </h2>
                <text-highlight :queries="search ? search.split(' ') : []">{{ session.globalNote }}</text-highlight>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-bottom-sheet v-model="sessionSheet">
      <SessionForm
        :readonly="true"
        :sessionid="selectedSession"
        @close="sessionSheet=false"
        @complete="getStories"
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
      search: ""
    };
  },
  methods: {
    startEditing() {
      this.editStory =
        this.selectedTab === 0
          ? this.$parent.chronicle.privateStory
          : this.$parent.chronicle.publicStory;
      this.editing = true;
    },
    async saveStory() {
      let input = {};
      if (this.selectedTab === 0) {
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
      this.stories = await this.Service.storyService.getStories(
        this.$route.params.id
      );
      await this.getSessions();
      this.sessionSheet = false;
    },
    async getSessions(clear) {
      if (clear) {
        this.search = "";
      }
      for (let i = 0; i < this.stories.length; i++) {
        if (this.search) {
          this.stories[
            i
          ].sessions = await this.Service.sessionService.searchSessions(
            this.search,
            this.$route.params.id,
            this.stories[i]._id
          );
        } else {
          this.stories[
            i
          ].sessions = await this.Service.sessionService.getSessions(
            this.stories[i]._id
          );
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
