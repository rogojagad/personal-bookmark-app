<template>
  <base-input>
    <template>
      <label :for="this.name">{{ label }}</label>
      <input
        :class="{ 'invalid-input': !isLengthValid }"
        :id="this.name"
        @input="handleOnInput()"
        :name="this.name"
        type="text"
        v-model="inputValue"
      />
      <p v-if="!isLengthValid">
        {{ this.errorMessage }}
      </p>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  components: { BaseInput },
  data() {
    return {
      inputValue: "",
      isLengthValid: true,
      errorMessage: "",
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    maxLength: {
      type: Number,
      required: false,
      default: 40,
    },
    minLength: {
      type: Number,
      required: false,
      default: 5,
    },
    value: {
      type: String
    },
  },
  emits: ["input"],
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    }
  },
  methods: {
    handleOnInput() {
      const isExceedingLimit = this.inputValue.length > this.maxLength;
      const isUnderLimit = this.inputValue.length < this.minLength;
      let emittedValue = null;

      if (isExceedingLimit || isUnderLimit) {
        this.isLengthValid = false;

        this.errorMessage = isUnderLimit
          ? `Min input length is ${this.minLength}`
          : `Exceeding max limit of ${this.maxLength} chars`;
      } else {
        this.isLengthValid = true;
        emittedValue = this.inputValue;
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
