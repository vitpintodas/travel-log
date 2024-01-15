<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" padding>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profil</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-text-center">
      <ion-item> <h1>Bonjour, {{ username }}</h1> </ion-item>
      <form @submit.prevent="editProfile">
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input v-model="username" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
      </form>
      <div class="form-group">
        <Button @click="submitForm" :buttonText="'Modifier'"/>
      </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import FormField from "@/components/FormField.vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
