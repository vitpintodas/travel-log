<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bonjour {{ username }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Username</ion-label>
        <ion-input type="password" v-model="currentPassword" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Mot de passe</ion-label>
        <ion-input type="password" v-model="newPassword" required></ion-input>
      </ion-item>
      <ion-button @click="$router.push({ name: 'PasswordPage' })" expand="block">Modifier le mot de passe</ion-button>
      <ion-button @click="deconnected" expand="block">Déconnexion</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { AuthService } from '@/security/auth-service';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';

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
    const username = ref('');

    onMounted(async () => {
      try {
        const user = await AuthService.getUser();
        if (user) {
          username.value = user.name;
        }
      } catch (error) {
        console.error(error);
      }
    })

    const updatePassword = () => {
      // Handle updating password here
    };

    return {
      currentPassword,
      newPassword,
      confirmNewPassword,
      username,
      updatePassword
    };
  },
  methods: {
    deconnected() {
      AuthService.logOut();
    }
  }
});
</script>

<style scoped>
</style>