<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit()">
      <text-input
        label="Title"
        name="title"
        :max-length="60"
        v-model="title"
      ></text-input>

      <text-input
        label="Description"
        name="description"
        :max-length="70"
        v-model="description"
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
      description: null,
      title: null,
      url: null,
    };
  },
  components: { UrlInput, SelectInput, TextInput },
  computed: {
    isDisabled() {
      const validCategory = this.category !== "-";
      return Boolean(
        validCategory && this.title && this.url && this.description
      );
    },
  },
  inject: ["categories", "handleBookmarkFormSubmitted"],
  methods: {
    async handleSubmit() {
      const response = await this.$http.post("bookmark", {
        category: this.category,
        description: this.description,
        title: this.title,
        url: this.url,
      });

      const {
        data: { id },
      } = response;

      console.log(id);

      this.handleBookmarkFormSubmitted({
        category: this.category,
        id: Math.random()
          .toString(36)
          .substring(7),
        title: this.title,
        url: this.url,
        description: this.description,
      });

      this.title = null;
      this.category = "-";
      this.url = null;
      this.description = null;
    },
  },
};
</script>

<style></style>
