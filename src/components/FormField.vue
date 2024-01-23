<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      v-model="inputValue"
      :required="required"
      :placeholder="label"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: String,
    label: String,
    type: String,
    value: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
