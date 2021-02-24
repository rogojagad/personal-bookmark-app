<template>
  <div>
    <the-header></the-header>
    <bookmark-form
      @form-submitted="handleBookmarkFormSubmitted"
    ></bookmark-form>
    <bookmark-grid
      v-for="category in this.availableCategories"
      :category="category"
      :key="category.key"
    ></bookmark-grid>
  </div>
</template>

<script>
import { AVAILABLE_CATEGORIES } from "./../../constants";
import BookmarkForm from "./../layout/BookmarkForm";
import BookmarkGrid from "./../layout/BookmarkGrid";
import TheHeader from "./../layout/TheHeader";

export default {
  components: { BookmarkForm, BookmarkGrid, TheHeader },
  data() {
    return {
      availableBookmarks: [],
      availableCategories: AVAILABLE_CATEGORIES,
    };
  },
  provide() {
    return {
      bookmarks: this.availableBookmarks,
      categories: this.availableCategories,
      handleBookmarkFormSubmitted: this.handleBookmarkFormSubmitted,
      handleBookmarkDeleted: this.handleBookmarkDeleted,
    };
  },
  methods: {
    handleBookmarkFormSubmitted(newBookmark) {
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
  async mounted() {
    const response = await this.$http.get("bookmark", true);
    const bookmarks = response.data;

    bookmarks.forEach((bookmark) => {
      this.availableBookmarks.push({
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        category: bookmark.category,
      });
    });
  },
};
</script>
