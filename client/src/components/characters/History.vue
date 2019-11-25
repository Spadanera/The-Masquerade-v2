<template>
  <v-card>
    <v-card-title>
      <v-layout wrap>
        <v-flex xs12 sm6 md8 lg6 xl7>
          <span class="headline">Sessions timeline</span>
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
      <v-timeline dense>
      <!-- <v-timeline dense v-for="story in stories" v-bind:key="story._id"> -->
        <!-- <div class="title text-center">{{story.name}}</div> -->
        <v-timeline-item v-for="session in sessions" v-bind:key="session._id">
          <div class="py-3">
            <h2 class="headline font-weight-light mb-3">
              {{moment(session.sessionDate).format("YYYY-MM-DD")}}
            </h2>
            <text-highlight :queries="search ? search.split(' ') : []">{{ session.characters[0].playerNote }}</text-highlight>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    characterHistory: Array,
    sessions: Array
  },
  data() {
      return {
          search: ""
      }
  },
  methods: {
    getSessions(clear) {
      if (clear) {
        this.search = "";
      }
      this.$emit("search", this.search);
    }
  },
  created() {
    
  }
};
</script>

<style>
</style>