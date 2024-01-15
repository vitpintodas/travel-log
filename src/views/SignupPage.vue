<template>
  <div class="signup-form">
     <h1>Inscription</h1>
     <form @submit.prevent="handleSubmit">
       <ion-item>
         <ion-label position="floating">Nom d'utilisateur</ion-label>
         <ion-input type="text" v-model="username" required></ion-input>
       </ion-item>
       <ion-item>
         <ion-label position="floating">Mot de passe</ion-label>
         <ion-input type="password" v-model="password" required></ion-input>
       </ion-item>
       <ion-item>
         <ion-label position="floating">Confirmer le mot de passe</ion-label>
         <ion-input type="password" v-model="confirmPassword" required></ion-input>
       </ion-item>
 
       <div class="form-group">
         <ion-button @click="submitForm" expand="block">
           Inscription
         </ion-button>
       </div>
       
     </form>
  </div>
 </template>
 
 <script lang="ts">
 import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/vue";
 
 export default {
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("Submitted!");
    },
    submitForm() {
      console.log('Formulaire soumis !');
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