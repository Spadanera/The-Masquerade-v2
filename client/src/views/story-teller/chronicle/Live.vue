<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px;"
    >
      <v-text-field
        v-model="search"
        label="Search Character"
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="highlight_off"
      ></v-text-field>
      <!-- Group and character list -->
      <v-treeview
        v-model="characters"
        :items="groups"
        item-key="_id"
        item-text="name"
        transition
        item-children="characters"
        :search="search"
        open-on-click
        selectable
        on-icon="check_box"
        off-icon="check_box_outline_blank"
        selected-color="#b71c1c"
        indeterminate-icon="indeterminate_check_box"
        return-object
      ></v-treeview>
      <v-footer :fixed="true" v-if="onGoingStory">
        <v-btn v-if="!sessionOnGoing" class="footer-button" @click="dialog=true">Start Session</v-btn>
        <v-btn
          v-else
          class="footer-button"
          color="primary"
          @click="sessionDetails()"
        >Session Details</v-btn>
      </v-footer>
    </v-navigation-drawer>
    <!-- Character visualization -->
    <div v-if="selection.length === 0" class="pa-3">
      <span class="headline">No character selected</span>
    </div>
    <div class="fill-height custom-width" v-else>
      <v-tabs v-model="selectedCharacter" slider-color="#b71c1c" class="fill-height">
        <v-tab v-for="(character, i) in selection" :key="i" ripple>
          <v-avatar v-if="character.picture" size="30">
            <img :src="character.picture" :alt="character.name" style="margin-right: 15px" />
          </v-avatar>
          {{ character.name }}
        </v-tab>
        <v-tab-item
          :transition="false"
          :reverse-transition="false"
          v-for="(character, i) in selection"
          :key="i"
          class="fill-height"
        >
          <div class="bring-up fill-height">
            <Sheet
              :characterId="character._id"
              :showToolbar="false"
              :showActions="false"
              :autoReload="character.player"
              @close="closeCharacter"
              :characterService="character.player ? Service.playerService : Service.coterieService"
              :edit="false"
              :live="true"
            />
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
    <v-bottom-sheet v-model="sheet" persistent>
      <SessionForm
        :readonly="false"
        :sessionid="onGoingSession._id"
        @close="sheet=false"
        @complete="sessionCompleted"
      />
    </v-bottom-sheet>
    <v-dialog v-model="dialog" width="290">
      <v-date-picker v-model="sessionDate" color="primary"></v-date-picker>
      <v-footer>
        <v-btn
          class="footer-button"
          style="width: 50%"
          color="primary"
          @click="startSession()"
        >Start</v-btn>
        <v-btn class="footer-button" style="width: 50%" @click="dialog = false">Cancel</v-btn>
      </v-footer>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.enabled"
      :bottom="true"
      :left="false"
      :multi-line="false"
      :right="false"
      :timeout="3000"
      :vertical="false"
    >
      {{ snackbar.text }}
      <v-btn color="red" flat @click="snackbar.enabled = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import Sheet from "../../../components/characters/Sheet";
import SessionForm from "../../../components/live/SessionForm";
import moment from "moment";
export default {
  components: {
    Sheet,
    SessionForm
  },
  props: {
    navVisible: Boolean
  },
  data() {
    return {
      selection: [],
      selectedCharacter: null,
      groups: [
        {
          _id: "players",
          name: "Players",
          characters: []
        }
      ],
      search: "",
      characters: undefined,
      enableWatcher: false,
      sheet: false,
      onGoingSession: {},
      sessionOnGoing: false,
      dialog: false,
      sessionDate: moment().format("YYYY-MM-DD"),
      snackbar: {
        enabled: false,
        text: ""
      },
      onGoingStory: false
    };
  },
  methods: {
    closeCharacter() {},
    filter() {
      if (this.search) {
        return (item, search, textKey) =>
          item[textKey].toLowerCase().indexOf(search.toLowerCase()) > -1;
      }
      return true;
    },
    async startSession() {
      this.onGoingSession = await this.Service.sessionService.createSession(
        this.$route.params.id,
        {
          sessionDate: moment(this.sessionDate, "YYYY-MM-DD").format(),
          characters: this.groups[0].characters.map(character => {
            return {
              characterId: character._id,
              experiencePoints: 0,
              characterName: character.name
            };
          }),
          completed: false,
          chronicleId: this.$route.params.id
        }
      );
      this.sessionOnGoing = true;
      this.dialog = false;
      this.snackbar = {
        enabled: true,
        text: "Session started"
      };
    },
    sessionDetails() {
      this.sheet = true;
    },
    sessionCompleted() {
      this.onGoingSession = {};
      this.sessionOnGoing = false;
      this.sheet = false;
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
  async created() {
    let response = await this.Service.coterieService.getGroups(
      this.$route.params.id
    );
    this.groups = this.groups.concat(
      response.filter(group => group.characters.length > 0)
    );
    response = await this.Service.playerService.getAllCharacters(
      this.$route.params.id
    );
    this.groups[0].characters = response.map(character => {
      character.player = true;
      return character;
    });
    let selectedCharacters = this.$session.get("selectedCharacters");
    if (selectedCharacters) {
      this.characters = JSON.parse(selectedCharacters);
    }
    this.enableWatcher = true;

    this.onGoingSession =
      (await this.Service.sessionService.getOnGoingSession(
        this.$route.params.id
      )) || {};
    if (this.onGoingSession.sessionDate) {
      this.sessionOnGoing = true;
    }
    this.onGoingStory = !this.onGoingSession.noStory;
  },
  watch: {
    characters(newValue) {
      if (this.enableWatcher) {
        this.$session.set("selectedCharacters", JSON.stringify(newValue));
      }
      if (newValue) {
        let selectedCharacters = newValue.filter(character => character.alive);
        this.selection = selectedCharacters;
      } else {
        this.selection = [];
      }
    },
    navVisible(newValue) {
      this.ownNavVisible = newValue;
    },
    selection(newValue, oldValue) {
      if (newValue && oldValue) {
        if (newValue.length > oldValue.length) {
          this.selectedCharacter = newValue.length - 1;
        } else {
          this.selectedCharacter = 0;
        }
      }
    }
  }
};
</script>

<style>
.v-treeview .v-treeview-node:first-child .v-treeview-node__label {
  font-weight: "bold"
}
.v-tabs.fill-height > .v-window {
  height: calc(100% - 48px);
}

.v-tabs.fill-height > .v-window > .v-window__container {
  height: 100%;
}

.footer-button {
  margin: 0;
  width: 100%;
}

@media only screen and (max-width: 1264px) {
  .custom-width {
    width: 100%;
  }
}

@media only screen and (min-width: 1264px) {
  .custom-width {
    width: calc(100% - 300px);
  }
}
</style>
