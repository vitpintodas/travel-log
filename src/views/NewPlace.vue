<!-- NewTrip.vue -->
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Nouveau Lieu</ion-title>
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
            <div @click="getLocation" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <p v-if="location.latitude && location.longitude">{{ location.latitude }}, {{ location.longitude }}</p>
              <p v-else>Cliquez ici pour obtenir votre position actuelle</p>
            </div>
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
  
  <script lang=ts>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
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
    setup() {
      const newPlace = reactive({
        name: '',
        description: '',
        location: {
          latitude: null,
          longitude: null,
        },
      });
  
      const location = reactive({
        latitude: null,
        longitude: null,
      });
  
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
        location.latitude = position.coords.latitude as number | null;
        location.longitude = position.coords.longitude as number | null;
        });
      };
  
      const submitForm = () => {
        console.log('Formulaire soumis !', newPlace);
      };
  
      return {
        newPlace,
        location,
        getLocation,
        submitForm,
      };
    },
  });
  </script>
  
    
    <style scoped>
    .centered-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh; /* 100% de la hauteur de la vue */
    }
    
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        max-width: 400px;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        margin: 20px auto;
    }
   
    
    </style>
    