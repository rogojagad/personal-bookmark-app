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
import BookmarkForm from "./components/layout/BookmarkForm.vue";
import BookmarkGrid from "./components/layout/BookmarkGrid";
import TheHeader from "./components/layout/TheHeader";

export default {
  components: { BookmarkForm, BookmarkGrid, TheHeader },
  data() {
    return {
      availableBookmarks: [
        {
          id: "book1",
          title: "Binding Inline Styles",
          category: "good-reading",
          url: "https://vuejs.org/v2/guide/class-and-style.html",
        },
        {
          id: "book2",
          title: "Bookmark 2",
          category: "work-stuff",
          url: "https://google.com",
        },
        {
          id: "book3",
          title: "Bookmark 3",
          category: "entertainment",
          url: "https://google.com",
        },
      ],
      availableCategories: [
        { label: "Good Reading", key: "good-reading", colorCode: "#ffe294" },
        { label: "Work Stuff", key: "work-stuff", colorCode: "#b2ff94" },
        { label: "Entertainment", key: "entertainment", colorCode: "#e6a8a8" },
      ],
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
