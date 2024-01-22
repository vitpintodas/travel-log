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
          <!-- Afficher la liste des voyages sous forme de cartes -->
          <ion-card v-for="voyage in voyages" :key="voyage.id" @click="handleCardClick(voyage)">
            <ion-img :src="voyage.imageUrl" alt="Voyage Image"></ion-img>
            <ion-card-header>
              <ion-card-title>{{ voyage.title }}</ion-card-title>
              <ion-card-subtitle>{{ voyage.description.slice(0, 50) }}...</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonImg, IonFab, IonFabButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Button_Plus from '@/components/Button_Plus.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const voyages = ref([]);
const router = useRouter();

onMounted(async () => {
  // Effectuez une requête GET pour récupérer les voyages depuis l'API
  try {
    const response = await axios.get('https://my-travel-log-cfax.onrender.com/api/trips');
    voyages.value = response.data; // Mettez à jour la liste des voyages avec les données de l'API
  } catch (error) {
    console.error('Erreur lors de la récupération des voyages :', error);
  }
});

const handlePlusClick = () => {
  router.push('/tabs/trip/new-trip');
};

const handleCardClick = (voyage) => {
  // Gérez la navigation ou toute autre action lorsqu'une carte est cliquée
  console.log('Carte cliquée :', voyage);
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
