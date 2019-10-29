<template>
  <v-layout column>
    <v-layout>
      <v-flex shrink>
        <v-date-picker v-model="sessionDate" color="primary"></v-date-picker>
      </v-flex>
      <v-flex>
        <v-tabs grow v-model="active" slider-color="primary">
          <v-tab>Main</v-tab>
          <v-tab v-for="(character, i) in characters" :key="i">{{character.name}}</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-layout>
                  <v-flex grow pa-1>
                    <v-textarea
                      auto-grow
                      v-model="sessionNote"
                      label="Global Note"
                      clearable
                      rows="1"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-for="(character, i) in characters" :key="i">
            <v-card flat>
              <v-card-text>{{character.name}}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-footer color="primary" height="auto" style="width: 100%" class="session-footer">
      <v-layout justify-space-between>
        <v-flex shrink>
          <v-btn flat color="white" ma-0>Complete</v-btn>
        </v-flex>
        <v-flex shrink>
          <v-btn flat color="white" @click="close" ma-0>Close</v-btn>
        </v-flex>
        <v-flex grow>
          <v-layout justify-end>
            <v-btn flat color="white">Delete</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  name: "SessionForm",
  props: {
    characters: Array,
    readonly: Boolean,
    session: Object
  },
  data() {
    return {
      active: 0,
      sessionDate: "",
      sessionNote: "",
      sessionCharacters: []
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.sessionDate = moment(this.session.sessionDate).format("YYYY-MM-DD");
  }
};
</script>

<style>
  .session-footer button {
    margin: 0;
  }
</style>
