<template>
  <ion-page>
    <div class="signup-form">
      <h1>Connexion</h1>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <!-- <ion-label position="stacked">Nom d'utilisateur</ion-label> -->
          <ion-input label="Nom d'utilisateur" label-placement="floating" type="text" v-model="username" required
            placeholder="user123"></ion-input>
        </ion-item>
        <ion-item>
          <!-- <ion-label position="stacked">Mot de passe</ion-label> -->
          <ion-input label="Mot de passe" label-placement="floating" type="password" v-model="password" required
            placeholder="********"></ion-input>
        </ion-item>
        <span v-if="errorMessage">
          {{ errorMessage }}
        </span>
        <div class="ion-padding">
          <ion-button type="submit" expand="block">
            Connexion
          </ion-button>
          <ion-button @click="submitForm" expand="block">
            S'inscrire
          </ion-button>
        </div>
      </form>
    </div>
  </ion-page>
</template>
 
<script lang="ts">
import { AuthService } from "@/security/auth-service";
import { AuthRequest } from "@/security/auth-request.model";
import {
  IonItem,
  IonInput,
  IonButton,
  IonPage
} from "@ionic/vue";
import { AxiosError } from "axios";

export default {
  components: {
    IonItem,
    IonInput,
    IonButton,
    IonPage
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      const authRequest: AuthRequest = {
        username: this.username,
        password: this.password,
      };
      console.log('Formulaire soumis !', this.username, this.password);
      try {
        await AuthService.logIn(authRequest);
        this.$router.push('trip');
      } catch (error) {
        if (error instanceof AxiosError)
        {
          this.errorMessage = error?.response?.data.message || "Une erreur s'est produite";
        } else {
          this.errorMessage = "Une erreur s'est produite";
        }
      }
    },
    submitForm() {
      this.$router.push('signup');
    },
  }
};
</script>
 
<style scoped>
.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
}

.signup-form h1 {
  text-align: center;
  align-self: center;
  margin-bottom: 3rem;
  margin-top: -0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>