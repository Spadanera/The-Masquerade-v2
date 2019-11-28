<template>
  <v-layout align-start justify-start fill-height>
    <v-navigation-drawer
      v-model="ownNavVisible"
      class="left-modified"
      disable-route-watcher
      :fixed="this.$vuetify.breakpoint.mdAndDown"
      :stateless="true"
      style="z-index: 6; min-width: 300px"
      v-touch="{ left: () => ownNavVisible = false }"
    >
      <v-list avatar>
        <v-subheader class="headline">Players</v-subheader>
        <v-list-item-group v-model="index">
          <v-list-item v-for="(player, i) in players" :key="i" @click="select(player, false, true)" >
            <v-list-item-content>
              <v-list-item-title v-html="player.userDisplayName"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <img :src="player.userPicture" :alt="player.userDisplayName">
            </v-list-item-avatar>
            <!-- <div class="selected-element primary" v-if="player._id === $route.params.listid"></div> -->
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list v-if="invitations.length > 0" avatar>
        <v-subheader class="headline">Pending Invitations</v-subheader>
        <template v-for="(invitation) in invitations">
          <v-list-item :key="invitation._id">
            <v-list-item-content>
              <v-list-item-title v-html="invitation.emailAddress"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-btn text icon @click="deleteInvitation(invitation)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </v-list-item>
        </template>
      </v-list>
      <v-btn color="primary" style="padding-top: 2px;" @click="dialog=true">{{$ml.get("invitePlayer")}}</v-btn>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-flex v-if="players.length === 0 && !navVisible" class="hidden-lg-and-up">
      <v-btn color="primary" @click="dialog=true">{{$ml.get("invitePlayer")}}</v-btn>
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
      <v-btn color="red" text @click="snackbar.enabled = false">{{$ml.get("close")}}</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
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
      invitations: [],
      dialog: false,
      snackbar: {
        enabled: false,
        text: ""
      },
      index: 0
    };
  },
  methods: {
    async getPlayers() {
      this.players = await this.Service.playerService.getGroups(this.$route.params.id);
      if (this.players.length) {
        let find = this.players.find(p => p._id === this.$route.params.listid);
        if (find) {
          this.select(find, true);
        } else {
          this.select(this.players[0], true);
        }
      }
    },
    select(player, notToCloseNav, forceNavigation) {
      if (!this.$route.params.characterid || forceNavigation) {
        this.$router.push(
          `/story-teller/chronicle/${this.$route.params.id}/players/${
            player._id
          }`
        );
      }
      if (!notToCloseNav) {
        this.ownNavVisible = false;
      }
    },
    playerInvited(msg) {
      this.snackbar.text = msg || "Invitation sent";
      this.snackbar.enabled = true;
      this.getInvitations();
    },
    async getInvitations() {
      this.invitations = await this.Service.invitationService.getInvitations(this.$route.params.id);
    },
    async deleteInvitation(invitation) {
      let res = await this.$confirm(
        `Do you really want to delete invitation sent to ${invitation.emailAddress}?`,
        {
          title: "Warning"
        }
      );
      if (res) {
        await this.Service.invitationService.deleteInvitation(invitation._id);
        this.getInvitations();
        this.snackbar.text = "Invitation deleted";
        this.snackbar.enabled = true;
      }
    }
  },
  created() {
    this.getPlayers();
    this.getInvitations();
  },
  watch: {
    navVisible: function(newValue) {
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
