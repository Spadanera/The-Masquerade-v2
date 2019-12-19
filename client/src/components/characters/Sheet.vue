<template>
  <div
    style="width: 100%; position: relative; overflow: auto"
    v-if="loaded"
    class="max-height sheet-container"
  >
    <v-app-bar tabs style="text-center" absolute v-bind:class="{ primary: fighting }" v-if="!live">
      <v-app-bar-nav-icon>
        <v-avatar size="40px">
          <img :src="character.picture" :alt="character.name" @click="editImage()" />
        </v-avatar>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-text-field v-if="!readonly" :readonly="readonly" v-model="character.name" label></v-text-field>
        <span v-else>
          {{ character.name }}
          <span class="caption">{{$ml.get(character.alive)}}</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="character.alive && $vuetify.breakpoint.mdAndUp">
        <v-btn-toggle>
          <v-btn
            v-if="readonly && !fighting && edit && character.alive === 'alive'"
            color="primary"
            @click="fighting = true"
          >{{$ml.get("fight")}}</v-btn>
          <v-btn
            v-if="readonly && fighting && edit"
            @click="fighting = false"
          >{{$ml.get("endFight")}}</v-btn>
          <v-btn
            @click="assignModal= true"
            v-if="readonly && !fighting && edit && !isPlayer && character.alive === 'alive'"
          >{{$ml.get("assign")}}</v-btn>
          <v-btn
            @click="readonly= false"
            v-if="readonly && !fighting && edit && character.alive === 'alive'"
          >{{$ml.get("edit")}}</v-btn>
          <v-btn @click="save" v-if="!readonly && !fighting && edit">{{$ml.get("save")}}</v-btn>
          <v-btn @click="loadCharacter" v-if="!readonly && !fighting && edit">{{$ml.get("undo")}}</v-btn>
          <v-btn
            @click="killOrResumeCharacter(0)"
            v-if="edit && character.alive === 'alive'"
          >{{$ml.get("kill")}}</v-btn>
          <v-btn
            @click="killOrResumeCharacter(-1)"
            v-if="edit && character.alive !== 'lastdeath'"
          >{{$ml.get("lastdeath")}}</v-btn>
          <v-btn
            v-if="character.alive !== 'alive' && $vuetify.breakpoint.mdAndUp && edit && (!isPlayer || !oneAlive)"
            @click="killOrResumeCharacter(1)"
          >{{$ml.get("resume")}}</v-btn>
          <v-btn v-if="$vuetify.breakpoint.mdAndUp" @click="close">{{$ml.get("close")}}</v-btn>
        </v-btn-toggle>
      </div>
      <template v-slot:extension style="padding: 0" v-if="internalShowToolbar">
        <v-tabs
          v-model="characterTabs"
          slider-color="primary"
          centered
          grow
          style="margin: 0;"
          show-arrows
        >
          <v-tab>{{$ml.get("characteristics")}}</v-tab>
          <v-tab>{{$ml.get("background")}}</v-tab>
          <v-tab>{{$ml.get("story")}}</v-tab>
          <v-tab v-if="history">{{$ml.get("history")}}</v-tab>
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
      <v-btn color="red" text @click="snackbar.enabled = false">{{$ml.get("close")}}</v-btn>
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
      class="custom-speed-deal"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary" dark fab>
          <v-icon v-if="fab">close</v-icon>
          <v-icon v-else>more_vert</v-icon>
        </v-btn>
      </template>
      <v-btn
        v-if="readonly && !fighting && edit && character.alive === 'alive'"
        @click="fighting = true" color="primary"
      >{{$ml.get("fight")}}</v-btn>
      <v-btn v-if="readonly && fighting && edit" @click="fighting = false">{{$ml.get("endFight")}}</v-btn>
      <v-btn
        @click="assignModal= true"
        v-if="readonly && !isPlayer && !fighting && edit && character.alive === 'alive'"
      >{{$ml.get("assign")}}</v-btn>
      <v-btn
        @click="readonly= false"
        v-if="readonly && !fighting && edit && character.alive === 'alive'"
      >{{$ml.get("edit")}}</v-btn>
      <v-btn @click="save" v-if="!readonly && !fighting && edit">{{$ml.get("save")}}</v-btn>
      <v-btn @click="loadCharacter" v-if="!readonly && !fighting && edit">{{$ml.get("undo")}}</v-btn>
      <v-btn
        @click="killOrResumeCharacter(0)"
        v-if="edit && character.alive === 'alive'"
      >{{$ml.get("kill")}}</v-btn>
      <v-btn
        @click="killOrResumeCharacter(-1)"
        v-if="edit && character.alive !== 'lastdeath'"
      >{{$ml.get("lastdeath")}}</v-btn>
      <v-btn
        v-if="character.alive !== 'alive' && $vuetify.breakpoint.mdAndUp && edit && (!isPlayer || !oneAlive)"
        @click="killOrResumeCharacter(1)"
      >{{$ml.get("resume")}}</v-btn>
      <v-btn @click="close">{{$ml.get("close")}}</v-btn>
    </v-speed-dial>
    <EditPicture
      :dialog="editImageModal"
      @submitted="loadCharacter"
      @close="editImageModal = false"
      :characterService="characterService"
      :characterId="character._id"
    />
    <AssignCharacter
      :dialog="assignModal"
      @submitted="loadCharacter"
      @close="assignModal = false"
      :characterService="characterService"
      :character="character"
    />
  </div>
</template>

<script>
import Characteristics from "./Characteristics.vue";
import Story from "./Story.vue";
import Background from "./Background.vue";
import History from "./History.vue";
import EditPicture from "./EditPicture";
import AssignCharacter from "./AssignCharacter";

export default {
  components: {
    Characteristics,
    Story,
    Background,
    History,
    EditPicture,
    AssignCharacter
  },
  props: {
    characterId: String,
    showToolbar: Boolean,
    showActions: Boolean,
    autoReload: Boolean,
    live: Boolean,
    characterService: Object,
    edit: Boolean,
    isPlayer: Boolean
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
      history: false,
      oneAlive: false,
      editImageModal: false,
      assignModal: false
    };
  },
  methods: {
    async loadCharacter(autoreload) {
      this.character = await this.characterService.getCharacter(
        this.characterId,
        autoreload
      );
      if (this.isPlayer) {
        this.oneAlive = await this.characterService.oneAlive(this.$route.params.id, this.character.userId);
      }
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
        this.snackbar.text = this.$ml.get("saveSuccessfully");
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
    },
    editImage() {
      if (this.edit && this.readonly && this.character.alive === 'alive') {
        this.editImageModal = true;
      }
    }
  },
  async created() {
    await this.loadCharacter();
    if (this.autoReload) {
      this.intervals.push(setInterval(() => this.loadCharacter(true), 3000));
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
          this.snackbar.text = this.$ml.get("fightStarted");
          this.characterTabs = 0;
        } else {
          this.snackbar.text = this.$ml.get("fightEnded");
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

.custom-speed-deal {
  position: absolute;
  width: 200px;
  text-align: right;
}

.custom-speed-deal > div.v-speed-dial__list > div {
  width: 100%;
}
</style>
