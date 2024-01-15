<!-- NewTrip.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Voyages</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="centered-container">
        <h1>Nouveau Voyage</h1>
        <div class="form-container">
          <ion-item>
            <ion-label position="floating">Titre</ion-label>
            <ion-input v-model="title"></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label position="floating">Description</ion-label>
            <ion-textarea v-model="description"></ion-textarea>
          </ion-item>
          
          <ion-item>
            <ion-label position="floating">Photo</ion-label>
            <ion-input type="file" @change="handleFileChange"></ion-input>
          </ion-item>
          
          <ion-button @click="submitForm">Envoyer</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
  },
  data() {
    return {
      title: '',
      description: '',
      selectedFile: null,
    };
  },
  methods: {
  async submitForm() {
    try {
      // Créez un objet FormData pour envoyer les données du formulaire
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('photo', this.selectedFile);

      // Effectuez la requête de téléchargement de fichier avec Axios
      const response = await axios.post('https://comem-qimg.onrender.com/api/images/', formData, {
        headers: {
          'Authorization': 'Bearer IruLClhSUlGScM7iJgC2q3KgFGknD969lS3y6cYbC9etDPW8bIutIgFeum+wFxjqm/N1QKQXNy+cV9EiDhXi+QvbOZJTdMewAv/w8Yh6B3yUzZiJoQEZyEC3DGYWnbW/CUxW8QqWORiCcvjGPiUCFGWVXwPLKOkRiHXs/1Ms+fQ=',
        },
      });

      // Manipulez la réponse comme nécessaire (par exemple, obtenez l'URL de l'image téléchargée)
      const imageUrl = response.data.url;

      // Émettez un événement avec les données du nouveau voyage, y compris l'URL de l'image
      this.$emit('new-trip', {
        title: this.title,
        description: this.description,
        photoUrl: imageUrl,
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image', error);
    }
  },
  handleFileChange(event) {
    this.selectedFile = event.target.files[0];
  },
},

});
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.form-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
}
</style>
