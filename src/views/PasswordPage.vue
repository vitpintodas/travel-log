<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modification du mot de passe</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Mot de passe actuel</ion-label>
        <ion-input type="password" v-model="currentPassword" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Nouveau mot de passe</ion-label>
        <ion-input type="password" v-model="newPassword" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Confirmer le nouveau mot de passe</ion-label>
        <ion-input type="password" v-model="confirmNewPassword" required></ion-input>
      </ion-item>
      <ion-button @click="updatePassword" expand="block">Mettre à jour le mot de passe</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { AuthService } from '@/security/auth-service';

export default defineComponent({
  name: 'EditPassword',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  },
  setup() {
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const router = useRouter();

    const updatePassword = async () => {
      try {
        // Validation des entrées (par exemple, assurez-vous que les champs sont remplis correctement)

        // Récupérer l'ID de l'utilisateur à partir de AuthService
        const userID = await AuthService.getUser();
        if (!userID || !userID.id) {
          alert("ID utilisateur non trouvé. Veuillez vous reconnecter.");
          return;
        }
        
        // Construire l'objet de données à envoyer au serveur
        const passwordData = {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
          confirmNewPassword: confirmNewPassword.value
        };

        // Envoyer une requête HTTP pour mettre à jour le mot de passe de l'utilisateur
        const url = `https://comem-travel-log-api.onrender.com/api/users/${userID.id}`;
        const response = await axios.put(url, passwordData);

        if (response.data.success) {
          // Mot de passe mis à jour avec succès, rediriger vers la page "tabs 3"
          router.push('/tabs/tab3');
        } else {
          // La mise à jour a échoué, afficher un message d'erreur approprié à l'utilisateur
          alert("La mise à jour du mot de passe a échoué : " + response.data.message);
        }
      } catch (error) {
        // Gérer les erreurs en cas de problème de connexion, etc.
        console.error('Erreur lors de la mise à jour du mot de passe :', error);
        alert("Erreur lors de la mise à jour du mot de passe.");
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmNewPassword,
      updatePassword
    };
  }
});
</script>

<style scoped>
</style>
