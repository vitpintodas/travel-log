<template>
<ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ trip.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ trip.name }}</ion-card-title>
                    <ion-card-subtitle>{{ trip.description }}</ion-card-subtitle>
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
                        <ion-item v-if="trip.places.length === 0">
                            <ion-label>Aucun lieu pour le moment</ion-label>
                        </ion-item>
                        <ion-item v-for="place in trip.places" :key="place.id">
                            <ion-label>{{ place.name }}</ion-label>
                        </ion-item>
                    
                    </ion-list>
                </ion-card-content>
            </ion-card>
            <ion-button @click="$router.push({ name: 'NewPlace' })" expand="block">Ajouter un lieu</ion-button>
            <ion-button @click="deleteTrip" expand="block" color="danger">Supprimer le voyage</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import NewPlace from '@/views/NewPlace.vue';
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonButton  } from '@ionic/vue';


export default defineComponent({
    name: 'TripPage',
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
        NewPlace,
    },
    data() {
        return {
            trip: {
                name: 'My Trip',
                description: 'This is my trip description.',
                places: [

                ],
            },
            sortSectionOpen: false, // Add this line
            sortOption: '', // Add this line
        };
    },

   
    methods: {
        toggleSortSection() {
                                this.sortSectionOpen = !this.sortSectionOpen;
                            },
        deleteTrip() {
            // Implement delete trip functionality here
        },
    },
});
</script>

