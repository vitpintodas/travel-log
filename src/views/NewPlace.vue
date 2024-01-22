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
          <ion-label position="stacked">Lieu</ion-label>
          <ion-input v-model="newPlace.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Position</ion-label>
          <ion-label position="stacked">Position</ion-label>
          <ion-searchbar v-model="searchQuery" @ionChange="searchLocation" placeholder="Rechercher une position"></ion-searchbar>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Photo du lieu</ion-label>
          <ion-input type="file"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea v-model="newPlace.description"></ion-textarea>
        </ion-item>
      </ion-list>
      <ion-button @click="submitForm" expand="block">Envoyer</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';

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
      newPlace: {
        name: '',
        description: '',
        location: {
          latitude: null,
          longitude: null,
        },
      },
      location: {
        latitude: null,
        longitude: null,
      },
      searchQuery: '', // Add this line
      
    };
   
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
      });
    },
    submitForm() {
      this.newPlace.location = this.location;
      this.$emit('place-added', this.newPlace);
      this.newPlace = {
        name: '',
        description: '',
        location: {
          latitude: null,
          longitude: null,
        },
      };
      this.location = {
        latitude: null,
        longitude: null,
      };
      this.$router.push({ name: 'TripDetails' });

    },
    searchLocation() {
              // Add your logic here
            },
    
    
  },
  

};
</script>

<style scoped>

.search-container {
  position: absolute;
  top: 80px;
  left: 80px;
  z-index: 3;
  display: flex;
  align-items: center;
  background: white; /* or any color that suits your design */
  border-radius: 4px;
  padding: 5px;
}

.search-container ion-icon {
  font-size: 20px; /* Adjust as needed */
  margin-right: 5px;
}

input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  width: 300px; /* Adjust as needed */
}
</style>