<template>
  <v-layout column :style="{background: darkTheme ? '#424242' : '#FFFFFF' }">
    <v-banner 
    class="primary white--text" 
    v-if="$vuetify.breakpoint.smAndDown">{{moment(sessionDate).format($ml.get("dateFormat"))}}</v-banner>
    <v-layout>
      <v-flex shrink v-if="$vuetify.breakpoint.mdAndUp">
        <v-date-picker :locale="$ml.current" :readonly="readonly" v-model="sessionDate" color="primary"></v-date-picker>
      </v-flex>
      <v-flex>
        <v-tabs style="padding-left: 3px;" grow v-model="active" slider-color="primary" show-arrows>
          <v-tab :key="0">{{$ml.get("main")}}</v-tab>
          <v-tab
            v-for="(character, i) in session.characters"
            :key="i + 1"
          >{{character.characterName}}</v-tab>
          <v-tab-item :key="0">
            <v-card flat style="margin-left: 5px;">
              <v-card-text>
                <v-layout>
                  <v-flex grow pa-1>
                    <v-textarea
                      auto-grow
                      v-model="session.globalNote"
                      :label="$ml.get('globalNote')"
                      :clearable="!readonly"
                      :readonly="readonly"
                      rows="1"
                      v-if="!readonly"
                    />
                    <div v-else>
                      <h4>{{$ml.get("globalNote")}}</h4>
                      <text-highlight :queries="search">{{session.globalNote}}</text-highlight>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-for="(character, i) in session.characters" :key="i + 1">
            <v-card flat style="margin-left: 5px;">
              <v-card-text>
                <v-form autocomplete="off">
                  <v-container>
                    <v-layout>
                      <v-flex xs12 sm6>
                        <v-textarea
                          auto-grow
                          v-model="character.storyTellerNote"
                          :label="$ml.get('storyTellerNote')"
                          :clearable="!readonly"
                          :readonly="readonly"
                          rows="1"
                          v-if="!readonly"
                        />
                        <div v-else>
                          <h3>{{$ml.get('storyTellerNote')}}</h3>
                          <text-highlight :queries="search">{{character.storyTellerNote}}</text-highlight>
                        </div>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-layout column>
                          <v-flex xs12 sm3 pr-2>
                            <v-text-field
                              :readonly="readonly"
                              type="number"
                              :label="$ml.get('experiencePoints')"
                              v-model="character.experiencePoints"
                              v-if="!readonly"
                            ></v-text-field>
                            <div v-else>
                              <h3>
                                {{$ml.get('experiencePoints')}}:
                                <span
                                  style="font-weight: normal;"
                                >{{character.experiencePoints}}</span>
                              </h3>
                            </div>
                          </v-flex>
                          <v-flex grow>
                            <v-textarea
                              auto-grow
                              v-model="character.playerNote"
                              :label="$ml.get('playerNote')"
                              :clearable="!readonly"
                              readonly
                              rows="1"
                              v-if="!readonly"
                            />
                            <div v-else>
                              <h3>{{$ml.get('playerNote')}}</h3>
                              <text-highlight :queries="search">{{character.playerNote}}</text-highlight>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-footer color="primary" height="auto" style="width: 100%" class="session-footer">
      <v-layout justify-space-between>
        <v-flex shrink v-if="modified">
          <v-btn text color="white" @click="save" ma-0>{{$ml.get("save")}}</v-btn>
        </v-flex>
        <v-flex shrink v-if="modified">
          <v-btn text color="white" @click="getSession(sessionid)" ma-0>{{$ml.get("undo")}}</v-btn>
        </v-flex>
        <v-flex shrink v-if="!readonly">
          <v-btn text color="white" ma-0 @click="complete">{{$ml.get("complete")}}</v-btn>
        </v-flex>
        <v-flex shrink>
          <v-btn text color="white" @click="close" ma-0>{{$ml.get("close")}}</v-btn>
        </v-flex>
        <v-flex grow>
          <v-layout justify-end>
            <v-btn text color="white" @click="deleteSession">{{$ml.get("delete")}}</v-btn>
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
    readonly: Boolean,
    sessionid: String,
    search: Array
  },
  data() {
    return {
      active: 0,
      sessionDate: "",
      session: {},
      modified: false,
      darkTheme: false, //localStorage.darkTheme,
      menu: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      this.session.sessionDate = moment(this.sessionDate, "YYYY-MM-DD");
      await this.Service.sessionService.updateSession(this.session);
      this.modified = false;
    },
    async complete() {
      let res = await this.$confirm(`Do you really want to complete session?`, {
        title: "Warning"
      });
      if (res) {
        this.session.completed = true;
        await this.save();
        this.$emit("complete");
      }
    },
    async deleteSession() {
      let res = await this.$confirm(
        `Do you really want to delete this session?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        this.Service.sessionService.deleteSession(this.session._id);
        this.$emit("complete");
      }
    },
    async getSession(sessionId) {
      if (sessionId) {
        this.session =
          (await this.Service.sessionService.getSession(sessionId)) || {};
        this.sessionDate = moment(this.session.sessionDate).format(
          "YYYY-MM-DD"
        );
        window.setTimeout(() => (this.modified = false), 100);
      }
    }
  },
  async created() {
    this.getSession(this.sessionid);
  },
  watch: {
    sessionid: async function(newValue) {
      this.getSession(newValue);
    },
    session: {
      handler() {
        this.modified = true;
      },
      deep: true
    },
    sessionDate() {
      this.modified = true;
    }
  }
};
</script>

<style>
.session-footer button {
  margin: 0;
}
</style>
