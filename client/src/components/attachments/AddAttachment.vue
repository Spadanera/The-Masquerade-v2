<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Attachment</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="title" label="Name" required></v-text-field>
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
              required
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
            <v-autocomplete
              v-model="selectedPlayers"
              :items="players"
              outlined
              chips
              item-text="userDisplayName"
              item-value="_id"
              label="Player visibility"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.userPicture"></v-img>
                  </v-avatar>
                  {{ data.item.userDisplayName }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img :src="data.item.userPicture" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.userDisplayName"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Dismiss</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data() {
    return {
      valid: true,
      title: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      players: [],
      selectedPlayers: []
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
      this.title = "";
      this.selectedPlayers = [];
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
    },
    async submit() {
      if (this.$refs.form.validate()) {
        let playerVisibility = [];
        for (let i = 0; i < this.selectedPlayers.length; i++) {
          let player = this.players.find(
            p => p._id === this.selectedPlayers[i]
          );
          if (player) {
            playerVisibility.push({
              playerId: player._id
            });
          }
        }
        await this.Service.attachmentService.createAttachment(
          this.$route.params.id,
          {
            title: this.title,
            file: this.imageUrl,
            playerVisibility: playerVisibility
          }
        );
        this.$emit("submitted", this.coterieId);
        this.closeModal();
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    remove(item) {
      const index = this.selectedPlayers.indexOf(item._id);
      if (index >= 0) {
        this.selectedPlayers.splice(index, 1);
      }
    }
  },
  async created() {
    this.players = await this.Service.playerService.getGroups(
      this.$route.params.id
    );
  }
};
</script>

<style>
</style>