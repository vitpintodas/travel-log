<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Voyages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="centered-content">
        <p v-if="voyages.length === 0">
          Créez votre premier voyage pour commencer à enregistrer des lieux
        </p>

        <div v-else>
          <ion-card v-for="voyage in voyages" :key="voyage.id">
            <ion-img :src="voyage.imageUrl" alt="Voyage Image"></ion-img>
            <ion-card-header>
              <ion-card-title>{{ voyage.title }}</ion-card-title>
              <ion-card-subtitle>{{ voyage.description.slice(0, 50) }}...</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content v-if="!editingMode || (editingMode && editedVoyage.id !== voyage.id)">
              <ion-button fill="clear" @click.stop="editCard(voyage)">Modifier</ion-button>
              <ion-button fill="clear" @click.stop="enSavoirPlus(voyage)">En savoir plus</ion-button>
            </ion-card-content>

            <ion-card-content v-if="editingMode && editedVoyage.id === voyage.id">
              <ion-item>
                <ion-label position="floating">Nouveau titre</ion-label>
                <ion-input v-model="editedVoyage.title"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Nouvelle description</ion-label>
                <ion-input v-model="editedVoyage.description"></ion-input>
              </ion-item>

              <ion-button @click.stop="saveChanges(voyage)">Enregistrer</ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <Button_Plus @plusClick="handlePlusClick" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonImg, IonFab, IonFabButton, IonButton, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Button_Plus from '@/components/Button_Plus.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const voyages = ref([]);
const router = useRouter();

const editedVoyage = ref({
  id: null,
  title: '',
  description: '',
});

const editingMode = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get('https://my-travel-log-cfax.onrender.com/api/trips');
    voyages.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des voyages :', error);
  }
});

const handlePlusClick = () => {
  router.push('/tabs/trip/new-trip');
};

//fonction appelée quand on clique sur le bouton modifier d'une carte
const editCard = (voyage) => {
  editingMode.value = true;
  editedVoyage.value = { ...voyage };
};

// Nouvelle fonction pour le bouton "En savoir plus"
const enSavoirPlus = (voyage) => {
  console.log('Bouton "En savoir plus" cliqué pour le voyage :', voyage);
  // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton "En savoir plus" est cliqué
};

const saveChanges = async (originalVoyage) => {
  try {
    const response = await axios.patch(`https://my-travel-log-cfax.onrender.com/api/trips/${originalVoyage.id}`, editedVoyage.value, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMjkxNjUuNjI2LCJzdWIiOiIyMmYwYjNiMi0yM2VmLTRlNTEtYmVhYS1kYjFiNTdjYWY3MTEiLCJpYXQiOjE3MDU5MTk1NjV9.7Nm5n3viZD-qE9hYxw89FKi2Y0cb4eAaPzEA2gVHfkU',
      },
    });

    console.log('Réponse de la requête Axios :', response.data);

    const updatedResponse = await axios.get('https://my-travel-log-cfax.onrender.com/api/trips');
    voyages.value = updatedResponse.data;

    editingMode.value = false;
    editedVoyage.value = {
      id: null,
      title: '',
      description: '',
    };
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des modifications :', error);

    console.log('Réponse détaillée de l\'API :', error.response?.data);
  }
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
