<template>
  <base-input>
    <template>
      <label :for="this.name">{{ label }}</label>
      <input
        :class="{ 'invalid-input': !isValid }"
        type="text"
        :id="this.name"
        :name="this.name"
        @input="handleOnInput()"
        v-model="inputValue"
      />
      <p v-if="!isValid">Not a valid URL</p>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import ValidUrl from "valid-url";

export default {
  components: { BaseInput },
  data() {
    return {
      inputValue: "",
      isValid: true,
    };
  },
  props: ["label", "name", "value"],
  emits: ["input"],
  methods: {
    handleOnInput() {
      const isValidUrl =
        ValidUrl.isHttpsUri(this.inputValue) ||
        ValidUrl.isHttpUri(this.inputValue);

      let emittedValue = null;

      if (isValidUrl) {
        this.isValid = true;
        emittedValue = this.inputValue;
      } else {
        this.isValid = false;
      }

      this.$emit("input", emittedValue);
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  display: block;
  width: 40rem;
  max-width: 100%;
  margin-top: 0.5rem;
  height: 2.3rem;
  font-size: 1.3rem;
  border-radius: 0.5rem;
  border-width: 1px;
}

.invalid-input {
  border-color: red;
}

p {
  margin-top: 0;
  color: red;
}
</style>
