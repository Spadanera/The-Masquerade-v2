<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Character</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form" v-model="valid">
            <v-text-field v-model="character.name" label="Name" required></v-text-field>
            <v-text-field
              v-model="character.startingExperience"
              type="number"
              label="Starting Experience Points"
              required
            ></v-text-field>
            <v-select
              :items="$root.generations"
              label="Generation"
              v-model="character.mainInformation.generation"
            ></v-select>
            <v-select :items="$root.clans" label="Clan" v-model="character.mainInformation.clan"></v-select>
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
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
  name: "AddCharacter",
  props: {
    dialog: Boolean,
    coterieId: String,
    characterService: Object
  },
  data() {
    return {
      character: {
        mainInformation: {},
        mortal: {}
      },
      valid: true,
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
      this.character = {
        mainInformation: {},
        mortal: {}
      };
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.character.picture = this.imageFile;
        await this.characterService.createCharacterInGroup(
          this.character,
          this.coterieId
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
    }
  }
};
</script>

<style>
</style>
