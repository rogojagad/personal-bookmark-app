<template>
  <div>
    <the-header></the-header>
    <bookmark-form @form-submitted="handleFormSubmitted"></bookmark-form>
    <bookmark-grid
      v-for="category in this.categories"
      :category="category"
      :key="category.key"
    ></bookmark-grid>
  </div>
</template>

<script>
import BookmarkForm from "./../layout/BookmarkForm";
import BookmarkGrid from "./../layout/BookmarkGrid";
import TheHeader from "./../layout/TheHeader";

export default {
  inject: ["categories", "handleFormSubmitted"],
  components: { BookmarkForm, BookmarkGrid, TheHeader },
};
</script>
