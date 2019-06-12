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
      <v-list avatar>
        <v-subheader class="headline">Players</v-subheader>
        <template v-for="(player) in players">
          <v-list-tile :key="player._id" @click="select(player)" class="padding-list-item">
            <v-list-tile-content>
              <v-list-tile-title v-html="player.userDisplayName"></v-list-tile-title>
              <!-- <v-list-tile-sub-title v-html="player.description"></v-list-tile-sub-title> -->
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img :src="player.userPicture" :alt="player.userDisplayName">
            </v-list-tile-avatar>
            <div class="selected-element primary" v-if="player._id === $route.params.listid"></div>
          </v-list-tile>
        </template>
      </v-list>
      <v-btn color="primary" style="padding-top: 2px;" @click="dialog=true">Invite Player</v-btn>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-flex v-if="players.length === 0 && !navVisible" class="hidden-lg-and-up">
      <v-btn color="primary" @click="dialog=true">Invite Player</v-btn>
    </v-flex>
    <InvitePlayer
      :dialog="dialog"
      :chronicle-id="this.$route.params.id"
      @submitted="playerInvited"
      @close="dialog = false"
    />
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
import client from "../../../services/client";
import InvitePlayer from "../../../components/players/InvitePlayer";
export default {
  components: {
    InvitePlayer
  },
  props: {
    navVisible: Boolean
  },
  data() {
    return {
      players: [],
      dialog: false,
      snackbar: {
        enabled: false,
        text: ""
      },
    };
  },
  methods: {
    async getPlayers() {
      let response = await client.get(
        `/api/players/all/${this.$route.params.id}`
      );
      this.players = response.data;
      if (this.players.length) {
          this.select(this.players[0], true);
      }
    },
    select(player, notToCloseNav) {
      this.$router.push(
        `/story-teller/chronicle/${this.$route.params.id}/players/${player._id}`
      );
      if (!notToCloseNav) {
        this.ownNavVisible = false;
      }
    },
    playerInvited() {
      this.snackbar.text = "Invitation sent";
      this.snackbar.enabled = true;
    }
  },
  created() {
    this.getPlayers();
  },
  watch: {
    navVisible: function(newValue, oldValue) {
      this.ownNavVisible = newValue;
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
  }
};
</script>

<style>
.padding-list-item {
  padding: 10px 0;
}
</style>
