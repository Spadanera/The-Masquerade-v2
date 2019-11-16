<template>
  <v-layout fluid align-center justify-center wrap style="overflow: auto; max-height: 100%;">
    <v-flex v-for="attachment in attachments" v-bind:key="attachment._id" pa-2 xs12 sm6 md4 lg4 xl3>
      <v-card>
        <v-img :src="attachment.file" height="200px"></v-img>
        <v-card-title>{{attachment.title}}</v-card-title>
        <v-card-text>
          <v-item-group>
            <v-item v-for="player in attachment.playerVisibility" v-bind:key="player.playerId">
              <v-chip>
                  <v-avatar left>
                    <v-img :src="player.playerImage"></v-img>
                  </v-avatar>
                  {{ player.playerName }}
                </v-chip>
            </v-item>
          </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text>View</v-btn>
          <v-btn text>Edit</v-btn>
          <v-btn text>Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-btn v-if="isStoryTeller" color="primary" dark fixed bottom right fab @click="dialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <AddAttachment
      v-if="isStoryTeller"
      :dialog="dialog"
      @submitted="getAttachments"
      @close="dialog = false"
    />
  </v-layout>
</template>

<script>
import AddAttachment from "../../../components/attachments/AddAttachment";
export default {
  components: {
    AddAttachment
  },
  props: {
    attachmentService: Object,
    isStoryTeller: Boolean
  },
  data() {
    return {
      attachments: [],
      dialog: false
    };
  },
  methods: {
    async getAttachments() {
      this.attachments = await this.attachmentService.getAttachments(
        this.$route.params.id
      );
    }
  },
  async created() {
    await this.getAttachments();
  }
};
</script>

<style>
</style>