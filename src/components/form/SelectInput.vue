<template>
  <base-input>
    <template>
      <label :for="this.name">{{ label }}</label>
      <select @change="handleChange" v-model="selectedOptions">
        <option
          v-for="option in optionsValue"
          :key="option.key"
          :value="option.key"
          >{{ option.label }}</option
        >
      </select>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  components: { BaseInput },
  computed: {
    optionsValue: function() {
      const availableOptions = [
        {
          label: this.placeholder,
          value: null,
        },
      ];

      return availableOptions.concat(this.options);
    },
  },
  data() {
    return {
      selectedOptions: null,
    }
  },
  props: ["label", "name", "options", "value", "placeholder"],
  emits: ["input"],
  watch: {
    value(newValue) {
      this.selectedOptions = newValue;
    }
  },
  methods: {
    handleChange() {
      const selectedValue = this.selectedOptions;
      let emittedValue = null;

      if (selectedValue) {
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
