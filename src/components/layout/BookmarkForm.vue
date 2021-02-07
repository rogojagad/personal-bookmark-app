<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit()">
      <text-input
        label="Title"
        name="title"
        :max-length="50"
        v-model="title"
      ></text-input>

      <select-input
        label="Category"
        name="category"
        :options="categories"
        v-model="category"
        placeholder="Select a category"
      ></select-input>

      <url-input label="URL" name="url" v-model="url"></url-input>

      <button :disabled="!this.isDisabled">Save</button>
    </form>
  </div>
</template>

<script>
import SelectInput from "../form/SelectInput.vue";
import TextInput from "../form/TextInput.vue";
import UrlInput from "../form/UrlInput.vue";

export default {
  data() {
    return {
      category: null,
      title: null,
      url: null,
    };
  },
  components: { UrlInput, SelectInput, TextInput },
  computed: {
    isDisabled() {
      console.log(
        this.category,
        this.title,
        this.url,
        this.category && this.title && this.url
      );
      return Boolean(this.category && this.title && this.url);
    },
  },
  inject: ["categories", "handleFormSubmitted"],
  methods: {
    handleSubmit() {
      this.handleFormSubmitted({
        title: this.title,
        category: this.category,
        url: this.url,
      });
    },
  },
};
</script>

<style scoped>
.form-container {
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
