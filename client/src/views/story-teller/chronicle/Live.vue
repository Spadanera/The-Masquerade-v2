<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6"
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
    </v-navigation-drawer>
    <!-- Character visualization -->
    <div v-if="selection.length === 0" class="pa-3">
      <span class="headline">No character selected</span>
    </div>
    <div class="fill-height custom-width" v-else>
      <v-tabs v-model="selectedCharacter" slider-color="#b71c1c" class="fill-height">
        <v-tab v-for="(character, i) in selection" :key="i" ripple>
          <v-avatar v-if="character.picture" size="30">
            <img :src="character.picture" :alt="character.name" style="margin-right: 15px">
          </v-avatar>
          {{ character.name }}
        </v-tab>
        <v-tab-item v-for="(character, i) in selection" :key="i" class="fill-height">
          <div class="bring-up fill-height">
            <Sheet
              :characterId="character._id"
              :showToolbar="false"
              :showActions="false"
              :autoReload="character.player"
              @close="closeCharacter"
              :characterService="character.player ? characterPlayerService : characterCoterieService"
              :edit="false"
              :live="true"
            />
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-layout>
</template>

<script>
import client from "../../../services/client";
import coterieServices from "../../../services/coteries/characterList";
import characterCoterieService from "../../../services/coteries/character";
import characterPlayerService from "../../../services/chronicle-players/character";
import Sheet from "../../../components/characters/Sheet";
export default {
  components: {
    Sheet
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
      characterCoterieService: characterCoterieService,
      characterPlayerService: characterPlayerService,
      characters: undefined,
      enableWatcher: false
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
    let response = await client.get(
      `/api/coteries/all/${this.$route.params.id}`
    );
    this.groups = this.groups.concat(
      response.data.filter(group => group.characters.length > 0)
    );
    response = await client.get(
      `/api/players/all-characters/${this.$route.params.id}`
    );
    this.groups[0].characters = response.data.map(character => {
      character.player = true;
      return character;
    });
    let selectedCharacters = this.$session.get("selectedCharacters");
    if (selectedCharacters) {
      this.characters = JSON.parse(selectedCharacters);
    }
    this.enableWatcher = true;
  },
  watch: {
    characters: function(newValue, oldValue) {
      if (this.enableWatcher) {
        this.$session.set("selectedCharacters", JSON.stringify(newValue));
      }
      if (newValue) {
        let selectedCharacters = newValue.filter(
          character => character.alive
        );
        this.selection = selectedCharacters;
      }
      else {
        this.selection = [];
      }
    },
    navVisible: function(newValue, oldValue) {
      this.ownNavVisible = newValue;
    },
    selection: function(newValue, oldValue) {
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
.v-tabs.fill-height > .v-window {
  height: calc(100% - 48px);
}

.v-tabs.fill-height > .v-window > .v-window__container {
  height: 100%;
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
