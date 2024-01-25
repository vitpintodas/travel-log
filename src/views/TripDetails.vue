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
            <!-- <ion-item @click="toggleSortSection" button>
              <ion-button>Trier</ion-button>
            </ion-item> -->
            <!-- <ion-item v-if="sortSectionOpen">
              <ion-segment v-model="sortOption">
                <ion-segment-button value="nameAsc">
                  <ion-label>A-Z</ion-label>
                </ion-segment-button>
                <ion-segment-button value="nameDesc">
                  <ion-label>Z-A</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-item> -->
          </ion-list>
          <ion-list>
            <ion-item v-if="!sortedPlaces || sortedPlaces.length === 0">
              <ion-label>Aucun lieu pour le moment</ion-label>
            </ion-item>
            <ion-item v-for="place in sortedPlaces" :key="place.id">
              <ion-label>{{ place.name }}</ion-label>
              <p>{{ place.description }}</p> <!-- Ajout de la description ici -->
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-button @click="redirectToNewPlace" expand="block">Ajouter un lieu</ion-button>
      <ion-button @click="$router.push('/tabs/trip')" expand="block">Retour</ion-button>
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
        title: '',
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
    redirectToTrip() {
      this.$router.push({ name: '/tabs/trip' }).then(() => {
        window.location.reload();
      });
    }
  },

  computed: {
    sortedPlaces() {
      if (this.sortOption === 'nameAsc') {
        // Tri A-Z
        return this.trip.places.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortOption === 'nameDesc') {
        // Tri Z-A
        return this.trip.places.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        // Aucun tri
        return this.trip.places;
      }
    },
  },
  created() {
    const tripId = this.$route.params.id;

    // Récupérer les détails du voyage
    axios.get(`https://my-travel-log-cfax.onrender.com/api/trips/${tripId}`)
      .then(response => {
        console.log('Réponse de l\'API pour le voyage :', response.data);
        this.trip = response.data;

        // Récupérer les lieux associés à ce voyage
        axios.get(`https://my-travel-log-cfax.onrender.com/api/places`, {
          params: {
            trip: tripId,
          },
        })
          .then(placesResponse => {
            console.log('Réponse de l\'API pour les lieux :', placesResponse.data);
            this.trip.places = placesResponse.data;
          })
          .catch(placesError => {
            console.error('Erreur lors de la récupération des lieux :', placesError);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du voyage :', error);
      });
  },
});
</script>
