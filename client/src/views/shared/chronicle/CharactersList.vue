<template>
  <v-flex grow style="height: 100%; width: calc(100% - 300px)">
    <div class="pa-2">
      <div class="headline" v-html="groupname" v-if="groupname"></div>
      <div class="subheading" v-html="description" v-if="description"></div>
    </div>
    <v-layout v-if="characters.length" fluid align-center justify-center row wrap>
      <v-flex v-for="character in characters" v-bind:key="character._id" pa-2 xs12 sm6 md4 lg4 xl3>
        <v-card v-bind:class="{ dead: !character.alive }">
          <v-img :src="character.picture" height="200px"></v-img>
          <v-card-title>
            <div>
              <div class="headline">{{ character.name }}</div>
              <div v-if="character.mainInformation" class="grey--text">
                Generation:
                <strong>{{character.mainInformation.generation}}</strong>
              </div>
              <div v-if="character.mainInformation" class="grey--text">
                Clan:
                <strong>{{character.mainInformation.clan}}</strong>
              </div>
              <div v-if="character.mainInformation" class="grey--text">
                Sire:
                <strong>{{character.mainInformation.sire}}</strong>
              </div>
            </div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click="openCharacter(character._id)">Open</v-btn>
            <v-btn
              v-if="character.alive && edit"
              @click="killOrResumeCharacter(character, false)"
            >Kill</v-btn>
            <v-btn
              v-if="!character.alive && edit"
              @click="killOrResumeCharacter(character, true)"
            >Resume</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else pa-3>
      <span class="headline">No characters in this coterie</span>
    </v-layout>
    <v-btn color="primary" dark fixed bottom right fab @click="dialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <AddCharacter
      :dialog="dialog"
      :coterie-id="this.$route.params.listid"
      @submitted="getCharacters"
      @close="dialog = false"
      :characterService="groupService"
    />
  </v-flex>
</template>

<script>
import AddCharacter from "../../../components/characters/AddCharacter.vue";
export default {
  components: {
    AddCharacter
  },
  props: {
    groupService: Object,
    edit: Boolean,
    description: String,
    groupname: String
  },
  data() {
    return {
      characters: [],
      dialog: false
    };
  },
  methods: {
    async getCharacters(listid) {
      listid = listid || this.$route.params.listid;
      this.characters = await this.groupService.getGroupCharacters(
        listid,
        this
      );
    },
    openCharacter(characterId) {
      this.groupService.openCharacter(characterId, this);
    },
    async killOrResumeCharacter(character, alive) {
      await this.groupService.killOrResumeCharacter(character, alive, this);
    }
  },
  created() {
    this.getCharacters(this.$route.params.listid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getCharacters(to.params.listid);
    next();
  }
};
</script>

<style>
.dead {
  opacity: 0.3;
}
</style>
