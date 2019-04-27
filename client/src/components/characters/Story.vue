<template>
  <div style="padding: 15px">
    <ckeditor
      :editor="editor"
      v-model="character.mortal.story"
      :config="editorConfig"
      :disabled="readonly"
    ></ckeditor>
    </style>
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
