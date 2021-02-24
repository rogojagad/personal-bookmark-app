<template>
  <base-input>
    <template>
      <label>{{ this.label }}</label>
      <input
        type="password"
        :name="this.name"
        :id="this.name"
        v-model="password"
        @input="handleOnInput"
      />
      <p v-if="isLengthInvalid">
        {{ this.errorMessage }}
      </p>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput";

export default {
  components: { BaseInput },
  data() {
    return {
      errorMessage: "",
      isLengthInvalid: false,
      password: null,
    };
  },
  emits: ["input"],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    minLength: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  methods: {
    handleOnInput() {
      const isLengthUnderLimit = this.password.length < this.minLength;
      let emittedValue = null;

      if (isLengthUnderLimit) {
        this.isLengthInvalid = true;
        this.errorMessage = `Password must be consisted of at least ${this.minLength} chars`;
      } else {
        this.isLengthInvalid = false;
        emittedValue = this.password;
      }

      this.$emit("input", emittedValue);
    },
  },
};
</script>

<style scoped>
input[type="password"] {
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
