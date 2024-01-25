<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ajouter un lieu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
  <ion-input label="Lieu" v-model="place.name" :class="{ 'ion-invalid': titleError }"></ion-input>
  <ion-text color="danger" v-if="titleError">Le titre doit avoir entre 3 et 100 caractères.</ion-text>
  <ion-input label="Description" v-model="place.description" :class="{ 'ion-invalid': descriptionError }"></ion-input>
  <ion-text color="danger" v-if="descriptionError">La description doit avoir entre 5 et 50000 caractères.</ion-text>
</ion-item>


        <ion-item style="height: 400px; align-items: center;">
          <ion-label style="font-weight: bold; font-size: large;" position="stacked">Position</ion-label>
          <ion-input type="number" v-model="place.location.latitude" label="Latitude"></ion-input>
          <ion-input type="number" v-model="place.location.longitude" label="Longitude"></ion-input>
        </ion-item>
        <ion-item>
          <div id="map-container" style="height: 100%;">
            <div id="map"></div>
          </div>
        </ion-item>
        <ion-item>
          <ion-label style="font-weight: bold; font-size:large; " position="stacked">Photo du lieu</ion-label>
          <ion-input type="file" @change="handleFileChange"></ion-input>
        </ion-item>
        <ion-item>
        </ion-item>
      </ion-list>
      <ion-button @click="submitForm" expand="block">Envoyer</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/vue';

export default {
  name: 'NewPlace',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
  },
  data() {
    return {
      place: {
        tripId: '', // Ajoutez cette ligne pour inclure le tripId
        name: '',
        description: '',
        location: {
          latitude: 0,
          longitude: 0,
        },
        photo: null as File | null,
        pictureUrl: '',
      },
      map: undefined,
      userLocation: undefined,
      selectedLocations: [],
      allLocations: [],
      titleError: false,
      descriptionError: false,
    };
  },

  methods: {
    handleResize() {
      setTimeout(() => this.map?.invalidateSize(), 0);
    },
    initMap() {
      this.map = L.map('map').setView([51.505, -0.09], 13);
      if (this.map !== undefined) {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(this.map as L.Map);
      }

      this.map.on('click', this.mapClick);
      this.map.on('mousedown', () => this.map?.closePopup());
      this.map.whenReady(() => this.handleResize());
    },
    locateUser() {
      this.map?.locate({ setView: true, maxZoom: 16 });
      this.map?.on('locationfound', (e) => {
        this.userLocation = e.latlng;
        this.map?.setView(e.latlng, 16);
        L.marker(e.latlng).addTo(this.map as L.Map).bindPopup('You are here').openPopup();
      });
    },
    mapClick(e) {
      if (this.map !== undefined) {
        const selectedLocation = e.latlng;
        this.selectedLocations.push(selectedLocation);

        const marker = L.marker(selectedLocation).addTo(this.map as L.Map);
        marker.on('click', () => {
          this.map?.removeLayer(marker);
          this.selectedLocations = this.selectedLocations.filter((loc) => loc !== selectedLocation);
        });

        this.place.location.latitude = selectedLocation.lat;
        this.place.location.longitude = selectedLocation.lng;
      }
    },
    validateTitle() {
  const title = this.place.name.trim();
  const isValid = title.length >= 3 && title.length <= 100;
  this.titleError = !isValid; // Mettez cette ligne avant le retour
  return isValid;
},
validateDescription() {
  const description = this.place.description.trim();
  const isValid = description.length >= 5 && description.length <= 50000;
  this.descriptionError = !isValid; // Mettez cette ligne avant le retour
  return isValid;
},


    async submitForm() {
      try {
        const tripId = this.$route.params.id;

        if (!this.validateTitle()) {
        // Afficher un message d'erreur ou gérer la validation d'une autre manière
        console.error('Erreur : Le titre doit avoir entre 3 et 100 caractères.');
        return;
      }

      if (!this.validateDescription()) {
  // Afficher un message d'erreur ou gérer la validation d'une autre manière
  console.error('Erreur : La description doit avoir entre 5 et 50000 caractères.');
  return;
}



        console.log('tripId:', tripId);
        console.log('place:', this.place);
        console.log('place.name:', this.place.name);
        console.log('place.description:', this.place.description);
        console.log('place.location:', this.place.location);

        const requestBody = {
          name: this.place.name,
          description: this.place.description,
          tripId: tripId, // Utilisez la variable tripId
          location: {
            type: 'Point',
            coordinates: [this.place.location.latitude, this.place.location.longitude],
          },
          //pictureUrl: '', // Vous pouvez ajouter une URL de l'image si nécessaire
        };

        console.log('Request Body:', requestBody);

        // Envoyez la requête avec Axios
        const response = await axios.post('https://my-travel-log-cfax.onrender.com/api/places', requestBody, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMjkxNjUuNjI2LCJzdWIiOiIyMmYwYjNiMi0yM2VmLTRlNTEtYmVhYS1kYjFiNTdjYWY3MTEiLCJpYXQiOjE3MDU5MTk1NjV9.7Nm5n3viZD-qE9hYxw89FKi2Y0cb4eAaPzEA2gVHfkU',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response after submitting form:', response);

        if (response.status === 201) {
          console.log('Place ajoutée avec succès !');
          this.$router.push({ name: 'TripDetails', params: { id: tripId } });
        } else {
          console.error('Erreur lors de l\'ajout du lieu :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);

        if (error.response) {
          console.error('Réponse détaillée du serveur:', error.response.data);
        }
      }
    },
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.place.photo = target.files?.[0] ?? null;
    },
  },

  mounted() {
    this.initMap();
    this.locateUser();
  },
};
</script>

<style scoped>
  #map-container {
    height: 50%;
    width: 100%;
    position: fixed;
    top: 50;
    left: 100;
  }

  #map {
    bottom: -40px;
    height: 50%;
    width: 100%;
  }

  input[type="text"] {
    border: 1px solid #ccc;
    top: 15px;
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 4px;
    padding: 20px;
    width: 400px;
  }
</style>
