<template>
  <v-container fluid grid-list-md>
    <div v-if="!stories.length">
      <NoStories/>
    </div>
    <div v-if="stories.length">
      <v-layout wrap justify-space-around>
        <v-flex xs12 sm12 md6 lg4 xl3 v-for="story in stories" v-bind:key="story._id" class="my-2">
          <StoryCard :story="story"/>
        </v-flex>
      </v-layout>
      <AddStory />
    </div>
  </v-container>
</template>

<script>
import NoStories from "../components/stories/NoStories";
import StoryCard from "../components/stories/StoryCard";
import AddStory from "../components/stories/AddStory";
export default {
  components: {
    NoStories,
    StoryCard,
    AddStory
  },
  data() {
    return {
      stories: [
        {
          _id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
          name: "Prima storia",
          description:
            "Ullamco culpa esse pariatur laboris est excepteur anim labore ut enim consectetur ullamco anim magna. Anim est ut non elit. Consequat nisi amet duis eiusmod anim ipsum mollit ullamco. Id deserunt eiusmod consectetur reprehenderit duis labore incididunt voluptate commodo culpa laborum aute nisi. Duis irure duis sint ad occaecat laboris adipisicing amet laborum aliquip proident nisi reprehenderit minim. Minim deserunt officia ea sint enim elit duis proident eiusmod.",
          createdAt: "2019-03-12T13:22:03.920Z",
          updatedAt: "2019-03-12T13:22:03.920Z",
          coteries: []
        },
        {
          _id: "2b671a64-40d5-491e-99b0-da01ff1f3341",
          name: "Seconda storia",
          description:
            "Ullamco culpa esse pariatur laboris est excepteur anim labore ut enim consectetur ullamco anim magna. Anim est ut non elit. Consequat nisi amet duis eiusmod anim ipsum",
          createdAt: "2019-03-12T13:22:03.920Z",
          updatedAt: "2019-03-12T13:22:03.920Z",
          coteries: []
        },
        {
          _id: "4b671a64-40d5-491e-99b0-da01ff1f3341",
          name: "Terza storia",
          description:
            "Ullamco culpa esse pariatur laboris est excepteur anim labore ut enim consectetur ullamco anim magna. Anim est ut non elit. Consequat nisi amet duis eiusmod anim ipsum mollit ullamco. Id deserunt eiusmod consectetur reprehenderit duis labore incididunt voluptate commodo culpa laborum aute nisi. Duis irure duis sint ad occaecat laboris adipisicing amet laborum aliquip proident nisi reprehenderit minim. Minim deserunt officia ea sint enim elit duis proident eiusmod.",
          createdAt: "2019-03-12T13:22:03.920Z",
          updatedAt: "2019-03-12T13:22:03.920Z",
          coteries: []
        },
        {
          _id: "3b671a64-40d5-491e-99b0-da01ff1f3341",
          name: "Quarta storia",
          description:
            "Ullamco culpa esse pariatur laboris est excepteur anim labore ut enim consectetur ullamco anim magna. Anim est ut non elit. Consequat nisi amet duis eiusmod anim ipsum mollit ullamco. Id deserunt eiusmod consectetur reprehenderit duis labore incididunt voluptate commodo culpa laborum aute nisi. Duis irure duis sint ad occaecat laboris adipisicing amet laborum aliquip proident nisi reprehenderit minim. Minim deserunt officia ea sint enim elit duis proident eiusmod.",
          createdAt: "2019-03-12T13:22:03.920Z",
          updatedAt: "2019-03-12T13:22:03.920Z",
          coteries: []
        }
      ]
    };
  }
};
</script>

<style>
</style>

