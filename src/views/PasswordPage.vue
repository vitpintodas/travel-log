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

    const updatePassword = () => {
      // Handle updating password here
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