<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Voyages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Contenu centré -->
      <div class="centered-content">
        <!-- Afficher le texte si la liste de voyages est vide -->
        <p v-if="voyages.length === 0">
          Créez votre premier voyage pour commencer à enregistrer des lieux
        </p>

        <!-- Si la liste de voyages n'est pas vide, afficher les voyages -->
        <div v-else>
          <!-- Afficher la liste des voyages ici -->
          <ul>
            <li v-for="voyage in voyages" :key="voyage.id">{{ voyage.title }}</li>
          </ul>
        </div>
      </div>

      <!-- Bouton "Plus" en bas à droite -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <!-- Utilisez le composant Button_Plus en écoutant l'événement "plusClick" -->
          <Button_Plus @plusClick="handlePlusClick" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Button_Plus from '@/components/Button_Plus.vue';
import { link } from 'ionicons/icons';
import { ref } from 'vue';

const voyages = ref([]); // Remplacez cela par votre liste de voyages
const router = useRouter();

const handlePlusClick = () => {
  router.push('/tabs/trip/new-trip');
};
</script>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
