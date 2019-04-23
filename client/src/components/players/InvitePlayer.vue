<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Invite Player</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="invitation.emailAddress" label="Gmail Address" required></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeModal">Dismiss</v-btn>
        <v-btn color="blue darken-1" flat @click="submit">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import client from "../../services/client";
export default {
  name: "InvitePlayer",
  props: {
    dialog: Boolean,
    chronicleId: String
  },
  data() {
    return {
      invitation: {
        chronicleId: ''
      },
      valid: true
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.invitation.chronicleId = this.chronicleId;
        await client.post("/api/invitations", this.invitation);
        this.$emit("submitted");
        this.$emit("close", false);
      }
    }
  }
};
</script>

<style>
</style>
