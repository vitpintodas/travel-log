<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ trip.title || 'Nom du voyage non disponible' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ trip.title }}</ion-card-title>
          <ion-card-subtitle>Description du voyage : {{ trip.description }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-card-title>Lieux</ion-card-title>
          <ion-list>
            <ion-item @click="toggleSortSection" button>
              <ion-button>Trier</ion-button>
            </ion-item>
            <ion-item v-if="sortSectionOpen">
              <ion-segment v-model="sortOption">
                <ion-segment-button value="nameAsc">
                  <ion-label>A-Z</ion-label>
                </ion-segment-button>
                <ion-segment-button value="nameDesc">
                  <ion-label>Z-A</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-item v-if="!trip.places || trip.places.length === 0">
              <ion-label>Aucun lieu pour le moment</ion-label>
            </ion-item>
            <ion-item v-for="place in sortedPlaces" :key="place.id">
              <ion-label>{{ place.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-button @click="redirectToNewPlace" expand="block">Ajouter un lieu</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';

export default defineComponent({
  name: 'TripDetails',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  },
  data() {
    return {
      trip: {
        name: '',
        description: '',
        places: [],
      },
      sortSectionOpen: false,
      sortOption: '',
    };
  },
  methods: {
    toggleSortSection() {
      this.sortSectionOpen = !this.sortSectionOpen;
    },
    
    redirectToNewPlace() {
      const tripId = this.$route.params.id;
      this.$router.push({ name: 'NewPlace', params: { tripId } });
    },
  },
  computed: {
    sortedPlaces() {
      // Mettez en œuvre la logique de tri ici selon la valeur de this.sortOption
      // Vous pouvez utiliser une fonction comme lodash sortBy pour trier votre tableau
      // Exemple : import { sortBy } from 'lodash';
      // return sortBy(this.trip.places, 'name');
      return this.trip.places;
    },
  },
  created() {
    // Récupérer l'ID du voyage à partir des paramètres de la route
    const tripId = this.$route.params.id;

    // Faire une requête API pour obtenir les détails du voyage
    axios.get(`https://my-travel-log-cfax.onrender.com/api/trips/${tripId}`)
      .then(response => {
        console.log('Réponse de l\'API pour le voyage :', response.data);
        this.trip = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du voyage :', error);
      });
  },
});
</script>
