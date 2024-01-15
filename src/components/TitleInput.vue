<!-- TitleInput.vue -->
<template>
    <div>
      <input type="text" id="title" v-model="title" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
      };
    },
  };
  </script>
  