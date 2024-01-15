<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="signup-form">
        <h1>Connexion</h1>
        <form @submit.prevent="handleSubmit">
          <!-- Username input -->
          <ion-item>
            <ion-label position="floating">
              Username
            </ion-label>
            <ion-input type="text" v-model="username" required placeholder="user123" name="username"></ion-input>

            <ion-input label="Username" label-placement="floating" type=""></ion-input>
          </ion-item>

          <!-- Password input -->
          <ion-item>
            <ion-label position="floating">
              Password
            </ion-label>
            <ion-input type="password" v-model="password" required placeholder="*********" name="password"></ion-input>
          </ion-item>

          <ion-input label="Username" labelPlacement="floating" inputmode="text" :required="true" name="username"
            v-model="username"></ion-input>

          <div class="form-group">
            <ion-button type="submit" expand="block">Se connecter</ion-button>
            <ion-button type="button" expand="block">S'inscrire</ion-button>
          </div>
        </form>
      </div>
      <!-- <div class="signup-form">
        <h1>Connexion</h1>
        <form @submit.prevent="handleSubmit">
          <ion-input label="Username" labelPlacement="floating" inputmode="text" :required="true" name="username"
            v-model="username"></ion-input>
          <form-field id="username" label="Nom d'utilisateur" type="username" v-model="username" required
            placeholder="user123" />
          <form-field id="password" label="Mot de passe" type="password" v-model="password" required
            placeholder="********" />
          <div class="form-group">
            <button type="submit">Se connecter</button>

            <button type="submit">S'inscrire</button>
          </div>
        </form>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<script lang="ts">
// import FormField from "@/components/FormField.vue";
import { AuthService } from '@/security/auth-service';
export default {
  // components: {
  //   FormField,
  // },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("Submitted with :", this.username, this.password);
      // if ( /* form is valid */) {
      //   AuthService.logIn({
      //     password: this.password,
      //     username: this.username
      //   }).then(user => console.log(user));
      // })
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
</style>
