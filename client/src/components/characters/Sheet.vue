<template>
  <div
    style="width: 100%; position: relative"
    id="sheet-container"
    v-if="loaded"
    class="max-height"
  >
    <v-toolbar tabs style="text-xs-center" absolute v-bind:class="{ primary: fighting }">
      <v-toolbar-side-icon>
        <v-avatar size="40px">
          <img :src="character.picture" :alt="character.name">
        </v-avatar>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <v-text-field
          v-if="!readonly"
          :readonly="readonly"
          v-model="character.name"
          label=""
        ></v-text-field>
        <span v-else>{{ character.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="character.alive && $vuetify.breakpoint.mdAndUp">
        <v-btn v-if="readonly && !fighting && edit" color="primary" @click="fighting = true">Fight</v-btn>
        <v-btn v-if="readonly && fighting && edit" @click="fighting = false">End Fight</v-btn>
        <v-btn @click="readonly= false" v-if="readonly && !fighting && edit">Edit</v-btn>
        <v-btn @click="save" v-if="!readonly && !fighting && edit">Save</v-btn>
        <v-btn @click="loadCharacter" v-if="!readonly && !fighting && edit">Undu</v-btn>
        <v-btn @click="killOrResumeCharacter(false)" v-if="edit">Kill</v-btn>
      </div>
      <v-btn
        v-if="!character.alive && $vuetify.breakpoint.mdAndUp && edit"
        @click="killOrResumeCharacter(true)"
      >Resume</v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" @click="close">Close</v-btn>
      <template v-slot:extension style="padding: 0" v-if="internalShowToolbar">
        <v-tabs v-model="characterTabs" slider-color="primary" centered grow>
          <v-tab>Characteristics</v-tab>
          <v-tab>Background</v-tab>
          <v-tab>Story</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items
      v-model="characterTabs"
      id="scrolling-techniques"
      v-bind:class="{ padding: internalShowToolbar }"
    >
      <v-tab-item>
        <Characteristics :character="character" :readonly="readonly" :fighting="fighting"/>
      </v-tab-item>
      <v-tab-item>
        <Background :character="character" :readonly="readonly"/>
      </v-tab-item>
      <v-tab-item>
        <Story :character="character" :readonly="readonly"/>
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
      <v-btn color="red" flat @click="snackbar.enabled = false">Close</v-btn>
    </v-snackbar>
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
      style="position: absolute"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary" dark fab>
          <v-icon>more_vert</v-icon>
          <v-icon>close</v-icon>
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
import client from "../../services/client";
import Characteristics from "./Characteristics.vue";
import Story from "./Story.vue";
import Background from "./Background.vue";
export default {
  components: {
    Characteristics,
    Story,
    Background
  },
  props: {
    characterId: String,
    showToolbar: Boolean,
    showActions: Boolean,
    autoReload: Boolean,
    characterService: Object,
    edit: Boolean
  },
  data() {
    return {
      readonly: true,
      fighting: false,
      loaded: false,
      dialog: false,
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
      fab: false
    };
  },
  methods: {
    async loadCharacter() {
      await this.characterService.load(this);
    },
    close() {
      this.$emit("close");
    },
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    async save() {
      await this.characterService.save(this);
    },
    async killOrResumeCharacter(alive) {
      await this.characterService.killOrResume(this.character, alive, this);
    }
  },
  created() {
    this.loadCharacter();
    if (this.autoReload) {
      setInterval(loadCharacter, 1000);
    }
  },
  watch: {
    fighting: {
      handler: function(val) {
        if (val) {
          this.snackbar.text = "Fight started - auto-save enable";
        } else {
          this.snackbar.text = "Fight ended - auto-save disable";
        }
        this.snackbar.enabled = true;
      }
    },
    character: {
      handler: function() {
        if (this.fighting) {
          this.save();
        }
      },
      deep: true
    },
    fighting: {
      handler: function(val) {
        if (val) {
          this.characterTabs = 0;
        }
      }
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
#sheet-container .v-toolbar__extension {
  padding: 0 !important;
}
#sheet-container > .v-window {
  max-height: 100%;
  overflow: auto;
  padding-top: 60px;
}

#sheet-container > .v-window.padding {
  padding-top: 112px !important;
}
</style>
