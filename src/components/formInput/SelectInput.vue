<template>
  <base-input>
    <template>
      <label :for="this.name">{{ label }}</label>
      <select @change="handleChange($event)" v-model="selectedOptions">
        <option
          :value="this.firstOption.key"
          :key="this.firstOption.key"
          disabled
          hidden
          selected
          >{{ this.placeholder }}</option
        >
        <option
          v-for="option in options"
          :key="option.key"
          :value="option.key"
          >{{ option.label }}</option
        >
      </select>
    </template>
  </base-input>
</template>

<script>
import { DEFAULT_SELECT_INPUT_VALUE } from "./../../constants";
import BaseInput from "./BaseInput.vue";

export default {
  components: { BaseInput },
  data() {
    return {
      firstOption: {
        label: this.placeholder,
        key: DEFAULT_SELECT_INPUT_VALUE,
      },
      selectedOptions: DEFAULT_SELECT_INPUT_VALUE,
    };
  },
  props: ["label", "name", "options", "value", "placeholder"],
  emits: ["input"],
  watch: {
    value(newValue) {
      this.selectedOptions = newValue;
    },
  },
  methods: {
    handleChange(event) {
      const selectedValue = event.target.value;
      let emittedValue = null;

      if (selectedValue !== DEFAULT_SELECT_INPUT_VALUE) {
        emittedValue = selectedValue;
      }

      this.$emit("input", emittedValue);
    },
  },
};
</script>

<style scoped>
select {
  display: block;
  width: 40rem;
  max-width: 100%;
  margin-top: 0.5rem;
  height: 2.3rem;
  font-size: 1.1rem;
}
</style>
