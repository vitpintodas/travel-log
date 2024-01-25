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
import { AuthService } from '@/security/auth-service';

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
        tripId: '',
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
      this.titleError = !isValid;
      return isValid;
    },
    validateDescription() {
      const description = this.place.description.trim();
      const isValid = description.length >= 5 && description.length <= 50000;
      this.descriptionError = !isValid;
      return isValid;
    },

    async submitForm() {
      try {
        const tripId = this.$route.params.id;

        if (!this.validateTitle()) {
          console.error('Erreur : Le titre doit avoir entre 3 et 100 caractères.');
          return;
        }

        if (!this.validateDescription()) {
          console.error('Erreur : La description doit avoir entre 5 et 50000 caractères.');
          return;
        }

        const imageData = {
          data: await this.convertImageToBase64(this.place.photo),
        };

        const imageResponse = await axios.post('https://comem-qimg.onrender.com/api/images/', imageData, {
          headers: {
            'Authorization': 'Bearer IruLClhSUlGScM7iJgC2q3KgFGknD969lS3y6cYbC9etDPW8bIutIgFeum+wFxjqm/N1QKQXNy+cV9EiDhXi+QvbOZJTdMewAv/w8Yh6B3yUzZiJoQEZyEC3DGYWnbW/CUxW8QqWORiCcvjGPiUCFGWVXwPLKOkRiHXs/1Ms+fQ=',
            'Content-Type': 'application/json',
          },
        });

        this.place.pictureUrl = imageResponse.data.url;

        const requestBody = {
          name: this.place.name,
          description: this.place.description,
          tripId: tripId,
          location: {
            type: 'Point',
            coordinates: [this.place.location.latitude, this.place.location.longitude],
          },
          pictureUrl: this.place.pictureUrl,
        };

        const token = await AuthService.getToken();
        const response = await axios.post('https://my-travel-log-cfax.onrender.com/api/places', requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          console.log('Place ajoutée avec succès !');
          this.$router.push({ name: 'TripDetails', params: { id: tripId } }).then(() => {
            window.location.reload();
          });
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

    async convertImageToBase64(image) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(image);
      });
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