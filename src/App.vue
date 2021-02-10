<template>
  <div id="app">
    <the-header></the-header>
    <bookmark-form @form-submitted="handleFormSubmitted"></bookmark-form>
    <bookmark-grid
      v-for="category in this.availableCategories"
      :category="category"
      :key="category.key"
    ></bookmark-grid>
  </div>
</template>

<script>
import { AVAILABLE_CATEGORIES, DUMMY_BOOKMARK_DATA } from "./constants";
import BookmarkForm from "./components/layout/BookmarkForm.vue";
import BookmarkGrid from "./components/layout/BookmarkGrid";
import TheHeader from "./components/layout/TheHeader";

export default {
  components: { BookmarkForm, BookmarkGrid, TheHeader },
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
