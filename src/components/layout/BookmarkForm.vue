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
import SelectInput from "../formInput/SelectInput.vue";
import TextInput from "../formInput/TextInput.vue";
import UrlInput from "../formInput/UrlInput.vue";

export default {
  data() {
    return {
      category: "-",
      title: null,
      url: null,
    };
  },
  components: { UrlInput, SelectInput, TextInput },
  computed: {
    isDisabled() {
      const validCategory = this.category !== "-";
      return Boolean(validCategory && this.title && this.url);
    },
  },
  inject: ["categories", "handleFormSubmitted"],
  methods: {
    handleSubmit() {
      this.handleFormSubmitted({
        category: this.category,
        id: Math.random()
          .toString(36)
          .substring(7),
        title: this.title,
        url: this.url,
      });

      this.title = null;
      this.category = "-";
      this.url = null;
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
