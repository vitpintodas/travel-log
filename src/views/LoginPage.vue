<template>
  <div class="signup-form">
     <h1>Connexion</h1>
     <form @submit.prevent="handleSubmit">
       <ion-item>
         <ion-label position="stacked">Nom d'utilisateur</ion-label>
         <ion-input
             type="text"
           v-model="username"
           required
           placeholder="user123"
         ></ion-input>
       </ion-item>
 
       <ion-item>
         <ion-label position="stacked">Mot de passe</ion-label>
         <ion-input
           type="password"
           v-model="password"
           required
           placeholder="********"
         ></ion-input>
       </ion-item>
 
       <div class="ion-padding">
         <ion-button @click="submitForm" expand="block">
           Connexion
         </ion-button>
 
         <ion-button @click="submitForm" expand="block">
           Inscrire
         </ion-button>
       </div>
     </form>
  </div>
 </template>
 
 <script lang="ts">
 import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton
 } from "@ionic/vue";
 
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
 
 form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }
 </style>