<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>{{$ml.get("changePicture")}}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form autocomplete="off" ref="form" v-model="valid">
            <v-text-field
              :label="$ml.get('selectImage')"
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
        <v-btn color="blue darken-1" text @click="closeModal">{{$ml.get("dismiss")}}</v-btn>
        <v-btn color="blue darken-1" text @click="submit">{{$ml.get("confirm")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  props: {
    dialog: Boolean,
    characterId: String,
    characterService: Object
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        await this.characterService.updateCharacterImage(
          this.characterId,
          this.imageFile
        );
        this.$emit("submitted");
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
