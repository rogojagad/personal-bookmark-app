<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { AVAILABLE_CATEGORIES, DUMMY_BOOKMARK_DATA } from "./constants";

export default {
  data() {
    return {
      availableBookmarks: DUMMY_BOOKMARK_DATA,
      availableCategories: AVAILABLE_CATEGORIES,
    };
  },
  provide() {
    return {
      bookmarks: this.availableBookmarks,
      categories: this.availableCategories,
      handleFormSubmitted: this.handleFormSubmitted,
      handleBookmarkDeleted: this.handleBookmarkDeleted,
    };
  },
  methods: {
    handleFormSubmitted(newBookmark) {
      this.availableBookmarks.push(newBookmark);
    },
    handleBookmarkDeleted(id) {
      let idx = -1;
      this.availableBookmarks.find((bookmark) => {
        idx++;
        return bookmark.id === id;
      });

      this.availableBookmarks.splice(idx, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
