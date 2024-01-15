<!-- PhotoInput.vue -->
<template>
    <div>
      <input type="file" id="photo" @change="handleFileChange" />
      <img v-if="photoPreview" :src="photoPreview" alt="Preview" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photo: null,
        photoPreview: null,
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.photo = file;
          this.previewPhoto();
        }
      },
      previewPhoto() {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.photoPreview = event.target.result;
        };
        reader.readAsDataURL(this.photo);
      },
    },
  };
  </script>
  