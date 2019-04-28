<template>
  <div style="padding: 15px">
    <ckeditor
      v-if="!readonly"
      :editor="editor"
      v-model="character.mortal.story"
      :config="editorConfig"
      :disabled="readonly"
      tag-name="textarea"
    ></ckeditor>
    <v-card v-else>
      <v-card-text>
        <div v-html="character.mortal.story"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "app",
  props: {
    character: Object,
    readonly: Boolean
  },
  data() {
    return {
      editor: ClassicEditor,
      story: "",
      editorConfig: {
        // The configuration of the editor.
      }
    };
  }
};
</script>

<style>
</style>
