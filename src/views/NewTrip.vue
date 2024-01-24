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



          <!-- Affichage de l'avertissement en rouge -->
          <p v-if="formError" class="form-error">{{ formError }}</p>

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
import { useRouter } from 'vue-router';
import { AuthService } from "@/security/auth-service";

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
      //imageUrl: '',
      formError: '', // Nouvelle donnée pour stocker l'erreur du formulaire
    };
  },

  methods: {
    async submitForm() {
      try {
        const token = await AuthService.getToken();
        if (token) {
          // Réinitialiser l'erreur du formulaire à chaque soumission
          this.formError = '';

          // Vérifier si les champs obligatoires sont remplis
          if (!this.title || !this.description) {
            this.formError = "Merci de remplir tous les champs"; // Avertissement si un champ est vide
            return;
          }

          // 1. Téléchargez l'image
          const formData = new FormData();
          formData.append('title', this.title);
          formData.append('description', this.description);
          /*formData.append('image', this.selectedFile);
          
          const imageResponse = await axios.post('https://comem-qimg.onrender.com/api/images/', formData, {
            headers: {
              'Authorization': 'Bearer IruLClhSUlGScM7iJgC2q3KgFGknD969lS3y6cYbC9etDPW8bIutIgFeum+wFxjqm/N1QKQXNy+cV9EiDhXi+QvbOZJTdMewAv/w8Yh6B3yUzZiJoQEZyEC3DGYWnbW/CUxW8QqWORiCcvjGPiUCFGWVXwPLKOkRiHXs/1Ms+fQ=',
              'Content-Type': 'multipart/form-data',
            },
          });
          
          // Récupérez l'URL de l'image téléchargée
          this.imageUrl = imageResponse.data.url;
          console.log('Image téléchargée avec succès:', this.imageUrl);*/

          // 2. Créez le corps de la requête pour créer le voyage
          const tripData = {
            title: this.title,
            description: this.description,
            //imageUrl: this.imageUrl,
          };

          console.log('Données du voyage:', tripData);

          // 3. Effectuez la requête pour créer un nouveau voyage
          console.log(`Bearer ${token}`);
          const tripResponse = await axios.post('https://my-travel-log-cfax.onrender.com/api/trips?include=user', tripData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('Voyage enregistré avec succès:', tripResponse.data);

          // 4. Émettez un événement avec les données du nouveau voyage, y compris l'URL de l'image
          this.$emit('new-trip', {
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
            tripId: tripResponse.data.id,
          });

          // 5. Rediriger l'utilisateur sur la vue Trip.vue
          this.$router.push('/tabs/trip').then(() => {
            window.location.reload();
          });

          console.log('Fin de la soumission du formulaire');
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
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

.form-error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
