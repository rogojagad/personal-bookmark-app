<template>
  <div class="bookmark-board" :style="gridColor">
    <h2>{{ this.category.label }}</h2>

    <div class="bookmark-grid">
      <bookmark-card
        v-for="bookmark in categoryInBookmarks"
        :bookmark="bookmark"
        :key="bookmark.id"
      ></bookmark-card>
      <span class="no-bookmark-notic" v-if="!categoryInBookmarks.length">
        <p>No bookmarks available for this category. Consider adding one.</p>
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
    categoryInBookmarks() {
      const categoryKey = this.category.key;
      const bookmarks = this.bookmarks.filter((bookmark) => {
        const bookmarkCategoryKey = bookmark.category;
        return bookmarkCategoryKey === categoryKey;
      });

      return bookmarks;
    },
  },
  inject: ["bookmarks"],
  props: ["category"],
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
