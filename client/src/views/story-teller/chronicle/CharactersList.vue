<template>
  <v-flex grow style="height: 100%">
    <v-layout v-if="characters.length" fluid align-center justify-center row wrap>
      <v-flex v-for="character in characters" v-bind:key="character._id" pa-2 xs12 sm12 md6 lg4 xl3>
        <v-card v-bind:class="{ dead: !character.alive }">
          <v-img :src="character.picture" height="200px"></v-img>
          <v-card-title>
            <div>
              <div class="headline">{{ character.name }}</div>
              <!-- <div class="grey--text">Clan: <span>{{character.mainInformation.clan}}</span></div> -->
              <div class="grey--text">Generation: 9th</div>
              <div class="grey--text">Sire: Cornelius</div>
            </div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click="openCharacter(character._id)">Open</v-btn>
            <v-btn v-if="character.alive" @click="killOrResumeCharacter(character, false)">Kill</v-btn>
            <v-btn v-if="!character.alive" @click="killOrResumeCharacter(character, true)">Resume</v-btn>
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
      :coterie-id="this.$route.params.conterieid"
      @submitted="getCharacters"
      @close="dialog = false"
    />
  </v-flex>
</template>

<script>
import client from "../../../services/client";
import AddCharacter from "../../../components/characters/AddCharacter.vue";
export default {
  components: {
    AddCharacter
  },
  data() {
    return {
      characters: [],
      dialog: false
    };
  },
  methods: {
    async getCharacters(coterieId) {
      coterieId = coterieId || this.$route.params.conterieid;
      let response = await client.get(`/api/coteries/${coterieId}`);
      this.characters = response.data.characters.sort((a, b) => {
        if (a.alive > b.alive) {
          return -1;
        } else if (a.alive < b.alive) {
          return 1;
        } else {
          return a.createdAt - b.createdAt;
        }
      });
    },
    openCharacter(characterId) {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/coteries/${
          this.$route.params.conterieid
        }/character/${characterId}`
      );
    },
    async killOrResumeCharacter(character, alive) {
      let res = await this.$confirm(
        `Do you really want to ${alive ? "resume" : "kill"} ${character.name}?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        await client.put(`api/characters/${character._id}`, { alive });
        this.getCharacters();
      }
    }
  },
  created() {
    this.getCharacters();
  },
  beforeRouteUpdate(to, from, next) {
    this.getCharacters(to.params.conterieid);
    next();
  }
};
</script>

<style>
.dead {
  opacity: 0.3;
}
</style>
