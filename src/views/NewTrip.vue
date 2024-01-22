<!-- NewTrip.vue -->
<template>
  <div class="centered-container">
    <h1>Nouveau Voyage</h1>
    <div class="form-container">
      <label for="title">Titre</label>
      <TitleInput id="title" />
      
      <label for="description">Description</label>
      <DescriptionInput id="description" />
      
      <label for="photo">Photo</label>
      <PhotoInput id="photo" />
      
      <Button @click="submitForm" :buttonText="'Envoyer'" />
    </div>
  </div>
</template>

<script lang=ts>
import TitleInput from '@/components/TitleInput.vue';
import DescriptionInput from '@/components/DescriptionInput.vue';
import PhotoInput from '@/components/PhotoInput.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    TitleInput,
    DescriptionInput,
    PhotoInput,
    Button,
  },
  methods: {
    submitForm() {
      console.log('Formulaire soumis !');
    },
  },
};
</script>

  
  <style scoped>
  .centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh; /* 100% de la hauteur de la vue */
  }
  
  .form-container {
    max-width: 400px; /* Largeur maximale du formulaire */
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px; /* Espacement entre le titre et le formulaire */
  }
  
  /* Ajoutez d'autres styles selon vos besoins */
  </style>
  