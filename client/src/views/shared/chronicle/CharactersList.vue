<template>
  <v-flex grow style="height: 100%; width: calc(100% - 300px)">
    <div
      class="pa-2 elevation-4"
      v-if="groupname"
      style="height: 90px; max-height: 90px; overflow: auto; background-color: #FFFFFF"
    >
      <div class="headline" v-html="groupname" v-if="groupname"></div>
      <div class="subheading font-weight-light" v-html="description" v-if="description"></div>
    </div>
    <v-layout fluid justify-center wrap style="overflow: auto; max-height: calc(100% - 90px);">
      <v-flex v-for="character in characters" v-bind:key="character._id" pa-2 xs12 sm6 md4 lg4 xl3>
        <v-card
          v-bind:class="{ dead: character.alive === 'torpor' || character.alive === 'lastdeath' }"
        >
          <div class="lastdeath" v-if="character.alive === 'lastdeath'">
            <img src="../../../assets/cross.png" alt />
          </div>
          <v-img v-if="character.picture" :src="character.picture" height="200px"></v-img>
          <v-card-title>
            <div class="headline">{{ character.name }}</div>
          </v-card-title>
          <v-card-text>
            <div>
              <div v-if="character.mainInformation" class="grey--text">
                {{$ml.get("generation")}}:
                <strong>{{character.mainInformation.generation}}</strong>
              </div>
              <div v-if="character.mainInformation" class="grey--text">
                {{$ml.get("clan")}}:
                <strong>{{character.mainInformation.clan}}</strong>
              </div>
              <div v-if="character.mainInformation" class="grey--text">
                {{$ml.get("sire")}}:
                <strong>{{character.mainInformation.sire}}</strong>
              </div>
              <div v-if="character.mainInformation" class="grey--text">
                {{$ml.get("lastUpdate")}}:
                <strong>{{moment(character.updateAt).format("YYYY-MM-DD")}}</strong>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="openCharacter(character._id)">{{$ml.get("open")}}</v-btn>
            <v-btn
              text
              color="error"
              v-if="character.alive === 'alive' && edit"
              @click="killOrResumeCharacter(character, 0)"
            >{{$ml.get("kill")}}</v-btn>
            <v-btn
              text
              color="error"
              v-if="character.alive === 'alive' && edit"
              @click="killOrResumeCharacter(character, -1)"
            >{{$ml.get("lastdeath")}}</v-btn>
            <v-btn
              text
              v-if="character.alive !== 'alive' && edit && (!player || !oneAlive)"
              @click="killOrResumeCharacter(character, 1)"
            >{{$ml.get("resume")}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn color="primary" v-if="edit && (!player || !oneAlive)" dark fixed bottom right fab @click="dialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <AddCharacter
      :dialog="dialog"
      :coterie-id="this.$route.params.listid"
      @submitted="getCharacters"
      @close="dialog = false"
      :characterService="groupService"
      v-if="edit"
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
    groupname: String,
    player: Boolean
  },
  data() {
    return {
      characters: [],
      dialog: false,
      darkTheme: false,
      oneAlive: false
    };
  },
  methods: {
    async getCharacters(listid) {
      listid = listid || this.$route.params.listid;
      this.characters = await this.groupService.getGroupCharacters(
        listid,
        this
      );
      if (this.characters.find(c => c.alive === "alive")) {
        this.oneAlive = true;
      }
      else {
        this.oneAlive = false;
      }
    },
    openCharacter(characterId) {
      this.groupService.openCharacter(characterId, this);
    },
    async killOrResumeCharacter(character, alive) {
      await this.groupService.killOrResumeCharacter(character, alive, this);
      await this.getCharacters();
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
.dead > .v-image,
.dead > .v-card__tiel,
.dead > .v-card__text {
  opacity: 0.3;
}

.lastdeath {
  position: absolute;
  left: 26%;
  top: 4%;
  width: 45%;
  height: 40%;
  z-index: 1;
}

.lastdeath > img {
  width: 100%;
  height: 100%;
}
</style>
