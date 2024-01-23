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
            <div id="map-container" style="height: 100%; ">
              <div id="map"></div>
            </div>
            </ion-item>
        <ion-item>
          <ion-label style="font-weight: bold; font-size:large; " position="stacked" >Photo du lieu</ion-label>
          <ion-input type="file" v-model="place.photo"></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea style="font-weight: bold;" position="stacked">Description</ion-textarea>
          <ion-textarea style="max-height: 20px;  width: 50%;"   v-model="place.description"></ion-textarea>
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

type Data = {
  place: {
    name: string;
    description: string;
    location: {
      latitude: number ;
      longitude: number;
    };
    photo: File;
  };
  map?: L.Map;
  userLocation?: L.LatLng;
  selectedLocations: L.LatLng[];
  allLocations: L.LatLng[];
};

export default {
  name: 'place',
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
  data(): Data {
    return {
      place: {
        name: '',
        description: '',
        location: {
            latitude: 0,
          longitude: 0,
        },
        photo: new File([], ''),
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
    mapClick(e: L.LeafletMouseEvent) {
  if (this.map !== undefined) {
    const selectedLocation = e.latlng;
    this.selectedLocations.push(selectedLocation);

    // Ajout d'un gestionnaire de clics pour supprimer le marqueur
    const marker = L.marker(selectedLocation).addTo(this.map as L.Map);
    marker.on('click', () => {
      this.map?.removeLayer(marker);
      this.selectedLocations = this.selectedLocations.filter((loc) => loc !== selectedLocation);
    });

    // Mettez à jour la position dans newPlace
    this.place.location.latitude = selectedLocation.lat;
    this.place.location.longitude = selectedLocation.lng;
  }
},

async submitForm() {
  try {

      // Préparez les données du formulaire
      const formData = new FormData();
      formData.append('name', this.place.name);
      formData.append('description', this.place.description);
      formData.append('latitude', this.place.location.latitude.toString());
      formData.append('longitude', this.place.location.longitude.toString());
      formData.append('photo', this.place.photo);

      console.log('Données à envoyer :', {
  name: this.place.name,
  description: this.place.description,
  latitude: this.place.location.latitude,
  longitude: this.place.location.longitude,
  photo: this.place.photo,
});

      
        // Envoyez la requête POST à votre API
        const response = await axios.post('https://my-travel-log-cfax.onrender.com/api/places', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMzgzNTEuNjc2LCJzdWIiOiJlNzQzYThlNy0xNjlmLTQ2ZTUtYWQzMC00MjMyOGZiNTgyOTkiLCJpYXQiOjE3MDU5Mjg3NTF9.ZuuSEVu0d-FuuatRfIeK0e3_3FTIyhvtnbXCHv6taGM',
          },
        });
        console.log('Réponse de l\'API :', response.data);


        // Vérifiez la réponse de l'API (peut varier en fonction de votre API)
        if (response.status === 201) {
          console.log('Lieu ajouté avec succès !');
          // Redirigez l'utilisateur vers la page souhaitée
          // this.$router.push({ name: 'NomDeLaPage' });
        } else {
          console.error('Erreur lors de l\'ajout du lieu.');
        }
      } catch (error) {

        console.error('Erreur lors de la requête POST :', error);

        if (error.response) {
      console.error('Réponse détaillée du serveur :', error.response.data);
    }
        
      }

    },
    handleFileChange(event: any) {
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



#filter-container {
  position: absolute;
  top: 80px;
  left: 80px;
  z-index: 1000;
  background: white;
  padding: 40px;
  border-radius: 5px;
}

#map-container {
  height: 50%;
  width: 50%;
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
  width: 400px; /* Adjust as needed */
}
</style>