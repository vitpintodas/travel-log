<template>
  <ion-page>
    <div class="signup-form">
      <h1>Inscription</h1>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <!-- <ion-label position="floating">Nom d'utilisateur</ion-label> -->
          <ion-input label="Nom d'utilisateur" label-placement="floating" type="text" v-model="name" required></ion-input>
        </ion-item>
        <ion-item>
          <!-- <ion-label position="floating">Mot de passe</ion-label> -->
          <ion-input label="Mot de passe" label-placement="floating" type="password" v-model="password"
            required></ion-input>
        </ion-item>
        <ion-item>
          <!-- <ion-label position="floating">Confirmer le mot de passe</ion-label> -->
          <ion-input label="Confirmer le mot de passe" label-placement="floating" type="password"
            v-model="confirmPassword" required></ion-input>
        </ion-item>
        <span v-if="errorMessage">
          {{ errorMessage }}
        </span>

        <div class="form-group">
          <ion-button type="submit" expand="block">
            Inscription
          </ion-button>
          <ion-button @click="submitForm" expand="block">
            Se connecter
          </ion-button>
        </div>
      </form>
    </div>
  </ion-page>
</template>
 
<script lang="ts">
import { UserRequest } from "@/security/user-request.model";
import { UserService } from "@/security/user-services";
import { AxiosError } from "axios";
import { IonItem, IonInput, IonButton, IonPage } from "@ionic/vue";
//  import axios from "axios";

//  const API_URL = "https://my-travel-log-cfax.onrender.com/api";

export default {
  components: {
    IonItem,
    IonInput,
    IonButton,
    IonPage
  },
  data() {
    return {
      name: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      const userRequest: UserRequest = {
        name: this.name,
        password: this.password,
      };

      if (this.password === this.confirmPassword) {
        try {
          await UserService.signUp(userRequest);
          this.$router.push('Login');
        } catch (error) {
          if (error instanceof AxiosError) {
            this.errorMessage = error?.response?.data.message || "Une erreur s'est produite";
          } else {
            this.errorMessage = "Une erreur s'est produite";
          }
        }
      } else {
        this.errorMessage = "Les mots de passes ne correspondent pas";
      }
    },
    submitForm() {
      this.$router.push('Login');
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

.center-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

ion-item {
  margin-bottom: 0.5rem;
}
</style>