<template>
  <div class="bookmark-board" :style="gridColor">
    <h2>{{ this.category.label }}</h2>

    <div class="bookmark-grid">
      <bookmark-card
        v-for="bookmark in bookmarksInCategory"
        :bookmark="bookmark"
        :key="bookmark.id"
      ></bookmark-card>
      <span
        class="no-bookmark-notice"
        v-if="bookmarksInCategory.length === 0 && !isLoading"
      >
        <p>No bookmarks available for this category. Consider adding one.</p>
      </span>
      <span
        class="no-bookmark-notice"
        v-else-if="bookmarksInCategory.length === 0 && isLoading"
      >
        <p>Loading...</p>
      </span>
    </div>
  </div>
</template>

<script>
import BookmarkCard from "./../card/BookmarkCard";

export default {
  components: { BookmarkCard },
  computed: {
    gridColor() {
      return {
        backgroundColor: this.category.colorCode,
      };
    },
    bookmarksInCategory() {
      const categoryKey = this.category.key;

      return this.bookmarks.filter((bookmark) => {
        const bookmarkCategory = bookmark.category;

        return bookmarkCategory === categoryKey;
      });
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  inject: ["bookmarks"],
  props: ["category"],
  watch: {
    bookmarksInCategory: function() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.bookmark-board {
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.26);
}

.bookmark-grid {
  margin: 0.5rem 0;
  display: flex;
}

h2 {
  text-align: left;
  margin-top: 0;
}

.no-bookmark-notice {
  display: block;
}
</style>
