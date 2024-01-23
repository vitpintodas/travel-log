<!-- DescriptionInput.vue -->
<template>
    <div>
      <textarea id="description" v-model="description"></textarea>
    </div>
  </template>
  
  <script lang=ts>
  export default {
    data() {
      return {
        description: '',
      };
    },
  };
  </script>
  