<template>
  <div
    style="width: 100%; position: relative; overflow: auto"
    v-if="loaded"
    class="max-height sheet-container"
  >
    <v-app-bar
      tabs
      style="text-center"
      absolute
      v-bind:class="{ primary: fighting }"
      v-if="!live"
    >
      <v-app-bar-nav-icon>
        <v-avatar size="40px">
          <img :src="character.picture" :alt="character.name" />
        </v-avatar>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-text-field v-if="!readonly" :readonly="readonly" v-model="character.name" label></v-text-field>
        <span v-else>{{ character.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="character.alive && $vuetify.breakpoint.mdAndUp">
        <v-btn-toggle>
          <v-btn v-if="readonly && !fighting && edit" color="primary" @click="fighting = true">Fight</v-btn>
          <v-btn v-if="readonly && fighting && edit" @click="fighting = false">End Fight</v-btn>
          <v-btn @click="readonly= false" v-if="readonly && !fighting && edit">Edit</v-btn>
          <v-btn @click="save" v-if="!readonly && !fighting && edit">Save</v-btn>
          <v-btn @click="loadCharacter" v-if="!readonly && !fighting && edit">Undu</v-btn>
          <v-btn @click="killOrResumeCharacter(false)" v-if="edit">Kill</v-btn>
          <v-btn
            v-if="!character.alive && $vuetify.breakpoint.mdAndUp && edit"
            @click="killOrResumeCharacter(true)"
          >Resume</v-btn>
          <v-btn v-if="$vuetify.breakpoint.mdAndUp" @click="close">Close</v-btn>
        </v-btn-toggle>
      </div>
      <template v-slot:extension style="padding: 0" v-if="internalShowToolbar">
        <v-tabs v-model="characterTabs" slider-color="primary" centered grow style="margin: 0;" show-arrows>
          <v-tab>Characteristics</v-tab>
          <v-tab>Background</v-tab>
          <v-tab>Story</v-tab>
          <v-tab v-if="history">History</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <Characteristics
      v-if="live"
      :character="character"
      :readonly="readonly"
      :fighting="fighting || live"
    />
    <v-tabs-items
      v-else
      v-model="characterTabs"
      class="scrolling-techniques"
      v-bind:class="{ padding: internalShowToolbar, paddinged: !live }"
    >
      <v-tab-item>
        <Characteristics :character="character" :readonly="readonly" :fighting="fighting" />
      </v-tab-item>
      <v-tab-item>
        <Background :character="character" :readonly="readonly" />
      </v-tab-item>
      <v-tab-item>
        <Story :character="character" :readonly="readonly" />
      </v-tab-item>
      <v-tab-item v-if="history">
        <History :sessions="sessions" @search="getSessions" />
      </v-tab-item>
    </v-tabs-items>
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
      <v-btn color="red" text @click="snackbar.enabled = false">Close</v-btn>
    </v-snackbar>
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
      style="position: absolute"
      v-if="$vuetify.breakpoint.smAndDown && !live"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary" dark fab>
          <v-icon v-if="fab">close</v-icon>
          <v-icon v-else>more_vert</v-icon>
        </v-btn>
      </template>
      <v-btn v-if="readonly && !fighting && edit" color="primary" @click="fighting = true">Fight</v-btn>
      <v-btn v-if="readonly && fighting && edit" @click="fighting = false">End Fight</v-btn>
      <v-btn @click="readonly= false" v-if="readonly && !fighting && edit">Edit</v-btn>
      <v-btn @click="save" v-if="!readonly && !fighting && edit">Save</v-btn>
      <v-btn @click="loadCharacter" v-if="!readonly && !fighting && edit">Undu</v-btn>
      <v-btn @click="killOrResumeCharacter(false)" v-if="edit">Kill</v-btn>
      <v-btn @click="close">Close</v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import Characteristics from "./Characteristics.vue";
import Story from "./Story.vue";
import Background from "./Background.vue";
import History from "./History.vue";
export default {
  components: {
    Characteristics,
    Story,
    Background,
    History
  },
  props: {
    characterId: String,
    showToolbar: Boolean,
    showActions: Boolean,
    autoReload: Boolean,
    live: Boolean,
    characterService: Object,
    edit: Boolean
  },
  data() {
    return {
      readonly: true,
      fighting: false,
      loaded: false,
      dialog: false,
      intervals: [],
      character: {
        mortal: {},
        mainInformation: {},
        health: {},
        willPower: {},
        attributes: {},
        skills: {},
        disciplines: [],
        hunger: {},
        humanity: {},
        bloodPotency: {},
        advantages: [],
        flaws: []
      },
      snackbar: {
        enabled: false,
        text: ""
      },
      characterTabs: 0,
      fab: false,
      sessions: [],
      history: false
    };
  },
  methods: {
    async loadCharacter() {
      this.character = await this.characterService.getCharacter(
        this.characterId
      );
      this.loaded = true;
      this.readonly = true;
    },
    async getSessions(search) {
      if (this.characterId) {
        search = search || "";
        this.sessions = await this.Service.sessionService.getCharacterSessions(
          search,
          this.characterId
        );
      }
    },
    close() {
      this.$emit("close");
    },
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    async save() {
      await this.characterService.updateCharacter(
        this.characterId,
        this.character
      );
      if (!this.fighting && !this.live) {
        this.snackbar.text = "Save successfully";
        this.snackbar.enabled = true;
      }
      this.readonly = true;
    },
    async killOrResumeCharacter(alive) {
      await this.characterService.killOrResumeCharacter(
        this.character,
        alive,
        this
      );
      await this.loadCharacter();
    }
  },
  async created() {
    await this.loadCharacter();
    if (this.autoReload) {
      this.intervals.push(setInterval(this.loadCharacter, 3000));
    }
    await this.getSessions();
    if (this.sessions.length) {
      this.history = true;
    }
  },
  beforeDestroy() {
    if (this.autoReload) {
      this.intervals.forEach(interval => window.clearInterval(interval));
    }
  },
  watch: {
    fighting: {
      handler: function(val) {
        if (val) {
          this.snackbar.text = "Fight started - auto-save enable";
          this.characterTabs = 0;
        } else {
          this.snackbar.text = "Fight ended - auto-save disable";
        }
        this.snackbar.enabled = true;
      }
    },
    character: {
      handler: function() {
        if (this.fighting || (this.live && !this.autoReload)) {
          this.save();
        }
      },
      deep: true
    }
  },
  computed: {
    internalShowToolbar: {
      get() {
        return this.showToolbar && !this.fighting;
      }
    }
  }
};
</script>

<style>
.sheet-container .v-toolbar__extension {
  padding: 0 !important;
}
.sheet-container > .v-window {
  max-height: 100%;
  overflow: auto;
}

.sheet-container.paddinged > .v-window {
  padding-top: 60px;
}

.sheet-container > .v-window.padding {
  padding-top: 112px !important;
}

.v-window {
  background: transparent !important;
}
</style>
