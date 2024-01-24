<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bonjour {{ username }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label>Nom d'utilisateur : {{ username }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Mot de passe : ********</ion-label>
      </ion-item>
      <ion-button @click="$router.push({ name: 'PasswordPage' })" expand="block">Modifier le mot de passe</ion-button>
      <ion-button @click="deconnected" expand="block">Déconnexion</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { AuthService } from '@/security/auth-service';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton } from '@ionic/vue';
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
    IonButton
  },
  setup() {
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
    });

    return {
      username
    };
  },
  methods: {
    deconnected() {
      AuthService.logOut();
    },
    redirectToPasswordChange() {
      // Logic to redirect to the password change page
      this.$router.push({ name: 'PasswordChange' });
    }
  }
});
</script>

<style scoped>
</style>
