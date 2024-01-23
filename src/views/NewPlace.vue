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
          <ion-input label="Lieu" v-model="place.name"></ion-input>
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
          <ion-textarea style="font-weight: bold;" position="stacked">Description</ion-textarea>
          <ion-textarea style="max-height: 20px;  width: 50%;" v-model="place.description"></ion-textarea>
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
        name: '',
        description: '',
        location: {
          latitude: 0,
          longitude: 0,
        },
        photo: null,
        pictureUrl: '', // Utiliser pictureUrl au lieu de imageUrl
      },
      map: undefined,
      userLocation: undefined,
      selectedLocations: [],
      allLocations: [],
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
    async submitForm() {
      try {
        console.log('Starting submitForm');

        const formData = new FormData();
        formData.append('name', this.place.name);
        formData.append('description', this.place.description);
        formData.append('location', JSON.stringify(this.place.location));

        // Téléchargez l'image avec le champ pictureUrl
        const imageFormData = new FormData();
        imageFormData.append('pictureUrl', this.place.photo);

        console.log('Before image upload');
        const imageResponse = await axios.post('https://comem-qimg.onrender.com/api/images/', imageFormData, {
          headers: {
            'Authorization': 'Bearer IruLClhSUlGScM7iJgC2q3KgFGknD969lS3y6cYbC9etDPW8bIutIgFeum+wFxjqm/N1QKQXNy+cV9EiDhXi+QvbOZJTdMewAv/w8Yh6B3yUzZiJoQEZyEC3DGYWnbW/CUxW8QqWORiCcvjGPiUCFGWVXwPLKOkRiHXs/1Ms+fQ=',
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('After image upload');

        // Utilisez pictureUrl au lieu de imageUrl
        this.place.pictureUrl = imageResponse.data.url;
        formData.append('pictureUrl', this.place.pictureUrl);
        console.log('Image téléchargée avec succès:', this.place.pictureUrl);

        console.log('Before place creation');
        const response = await axios.post('https://my-travel-log-cfax.onrender.com/api/places', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1N.eyJzdWIiOiIxMjM0NTY3ODkw.SflKxwRJSMeKKF',
          },
        });
        console.log('After place creation');

        console.log('Response:', response);

        if (response.status === 201) {
          console.log('Place added successfully!');
        } else {
          console.error('Error adding place.');
        }

        console.log('End of submitForm');
      } catch (error) {
        console.error('Error in submitForm:', error);

        if (error.response) {
          console.error('Detailed server response:', error.response.data);
        }
      }
    },
    handleFileChange(event) {
      this.place.photo = event.target.files[0];
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
