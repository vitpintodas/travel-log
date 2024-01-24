<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Voyages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content-with-margins">
      <div class="centered-content">
        <p v-if="voyages.length === 0">
          Créez votre premier voyage pour commencer à enregistrer des lieux
        </p>

        <div v-else>
          <ion-card v-for="voyage in voyages" :key="voyage.id" class="voyage-card">
            <!-- Ajout de l'image de montagne dans la partie haute de la carte -->
            <ion-img src="https://ionicframework.com/docs/img/demos/card-media.png"
              alt="Silhouette of mountains"></ion-img>

            <ion-card-header>
              <ion-card-title>{{ voyage.title }}</ion-card-title>
              <ion-card-subtitle>{{ voyage.description.slice(0, 50) }}...</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content v-if="!editingMode || (editingMode && editedVoyage.id !== voyage.id)">
              <ion-button fill="clear" @click.stop="editCard(voyage)">Modifier</ion-button>
              <ion-button fill="clear" @click.stop="enSavoirPlus(voyage)">Voir Détails</ion-button>
              <ion-button @click="confirmDelete(voyage)" expand="full" color="danger">Supprimer</ion-button>
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

              <!-- Affichage du message d'erreur si les champs sont vides -->
              <p v-if="isFieldsEmpty()" class="error-message">Merci de renseigner les informations manquantes.</p>

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
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonItem, IonLabel, IonInput, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Button_Plus from '@/components/Button_Plus.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { AuthService } from '@/security/auth-service';

const voyages = ref([]);
const router = useRouter();
const userId = ref('');

const editedVoyage = ref({
  id: null,
  title: '',
  description: '',
});

const editingMode = ref(false);

onMounted(async () => {
  try {
    const userID = await AuthService.getUser();
    if (userID) {
      userId.value = userID.id;
      const response = await axios.get(`https://my-travel-log-cfax.onrender.com/api/trips?user=${userId.value}`);
      voyages.value = response.data;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des voyages :', error);
  }
});

const handlePlusClick = () => {
  router.push('/tabs/trip/new-trip');
};

const editCard = (voyage) => {
  editingMode.value = true;
  editedVoyage.value = { ...voyage };
};

const enSavoirPlus = (voyage) => {
  console.log('Bouton "Voir détails" cliqué pour le voyage :', voyage);
  router.push({ name: 'TripDetails', params: { id: voyage.id, tripId: voyage.tripId } });

  // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton "Voir détail" est cliqué
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

const isFieldsEmpty = () => {
  return editedVoyage.value.title === '' || editedVoyage.value.description === '';
};

const confirmDelete = async (voyage) => {
  const alert = await alertController.create({
    header: 'Confirmation',
    message: `Voulez-vous vraiment supprimer le voyage "${voyage.title}" ? Cette action est irréversible.`,
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Confirmer',
        handler: async () => {
          try {
            const response = await axios.delete(`https://my-travel-log-cfax.onrender.com/api/trips/${voyage.id}`, {
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMjkxNjUuNjI2LCJzdWIiOiIyMmYwYjNiMi0yM2VmLTRlNTEtYmVhYS1kYjFiNTdjYWY3MTEiLCJpYXQiOjE3MDU5MTk1NjV9.7Nm5n3viZD-qE9hYxw89FKi2Y0cb4eAaPzEA2gVHfkU',
              },
            });

            console.log('Réponse de la requête Axios (suppression) :', response.data);

            const updatedResponse = await axios.get('https://my-travel-log-cfax.onrender.com/api/trips');
            voyages.value = updatedResponse.data;

            console.log('Voyage supprimé avec succès.');
          } catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                console.error('Erreur lors de la suppression du voyage :', 'Aucun voyage trouvé avec l\'ID spécifié.');
              } else if (error.response.status === 401) {
                console.error('Erreur lors de la suppression du voyage :', 'Non autorisé. Veuillez vous authentifier.');
              } else if (error.response.status === 403) {
                console.error('Erreur lors de la suppression du voyage :', 'Action interdite. Vous n\'avez pas les autorisations nécessaires.');
              } else {
                console.error('Erreur lors de la suppression du voyage :', error.response.data);
              }
            } else {
              console.error('Erreur lors de la suppression du voyage :', error.message);
            }
          }
        },
      },
    ],
  });

  await alert.present();
};


</script>

<style scoped>
.error-message {
  color: red;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-with-margins {
  margin-top: 20px;
  margin-bottom: 20px;
}

.voyage-card {
  max-width: 400px;

  /* Ajoutez ici des styles spécifiques pour la carte du voyage si nécessaire */
}
</style>
