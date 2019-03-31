<template>
  <v-layout fluid fill-height row wrap>
    <v-flex id="story" xs12 sm12 md12 lg6 pa-3>
      <v-card>
        <v-img
          class="white--text"
          height="250px"
          src="http://www.facemagazine.it/wp-content/uploads/2015/10/Dark-Cities-Milan-00009-DSC06581.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <div class="headline">{{ $parent.chronicle.name }}</div>
                <span>{{ $parent.chronicle.shortDescription }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <v-tabs centered grow slider-color="primary" v-model="selectedTab">
            <v-tab>Private Story</v-tab>
            <v-tab>Public Story</v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text v-if="!editing">{{ $parent.chronicle.privateStory }}</v-card-text>
                <v-textarea
                  v-else
                  v-model="editStory"
                  label
                  name="privatestory"
                  auto-grow
                  required
                  rows="1"
                ></v-textarea>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text v-if="!editing">{{ $parent.chronicle.publicStory }}</v-card-text>
                <v-textarea
                  v-else
                  v-model="editStory"
                  label
                  name="publicstory"
                  auto-grow
                  required
                  rows="1"
                ></v-textarea>
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
            <v-timeline-item>
              <!-- <span slot="opposite">2019-03-29</span> -->
              <div class="py-3">
                <h2 class="headline font-weight-light mb-3">2019-03-29</h2>
                <div>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</div>
              </div>
            </v-timeline-item>
            <v-timeline-item>
              <!-- <span slot="opposite">2019-03-29</span> -->
              <div class="py-3">
                <h2 class="headline font-weight-light mb-3">2019-03-29</h2>
                <div>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</div>
              </div>
            </v-timeline-item>
            <v-timeline-item>
              <!-- <span slot="opposite">2019-03-29</span> -->
              <div class="py-3">
                <h2 class="headline font-weight-light mb-3">2019-03-29</h2>
                <div>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import client from "../../../services/client";
export default {
  data() {
    return {
      editing: false,
      editStory: "",
      selectedTab: 0
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
      await client.put(`/api/chronicles/${this.$parent.chronicle._id}`, input);
      this.$emit("updated");
      this.editing = false;
    }
  },
  watch: {
    selectedTab() {
      this.editing = false;
    }
  }
};
</script>

<style>
</style>
