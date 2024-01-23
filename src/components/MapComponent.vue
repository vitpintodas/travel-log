<template>
  <div id="filter-container">
    <select v-model="selectedVoyage" @change="filterPinsByVoyage">
      <option value="" disabled selected>Sélectionnez un voyage</option>
      <option v-for="trip in trips" :key="trip.id" :value="trip.id">
        {{ trip.title }}
      </option>
    </select>
  </div>
  <div id="map-container">
    <div id="map"></div>
    <button id="locate-me" @click="locateUser">Locate Me</button>
  </div>
</template>

<script lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Trip } from "../models/trip";
import { Place } from "../models/place";

type Data = {
  map?: L.Map;
  userLocation?: L.LatLng;
  selectedLocations: L.LatLng[];
  trips: Trip[];
  selectedVoyage: string;
  allLocations: L.LatLng[];
  places: Place[];
};

export default {
  name: "MapComponent",
  data(): Data {
    return {
      map: undefined,
      userLocation: undefined,
      selectedLocations: [],
      trips: [],
      selectedVoyage: "",
      allLocations: [],
      places: [],
    };
  },
  mounted() {
    this.initMap();
    this.locateUser();
    this.fetchVoyages();
    this.filterPinsByVoyage();
  },
  methods: {
    handleResize() {
      setTimeout(() => this.map?.invalidateSize(), 0);
    },
    initMap() {
      this.map = L.map("map").setView([51.505, -0.09], 13);
      if (this.map) {
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(this.map as L.Map);
      }
      this.map.on("click", this.mapClick);
      this.map.on("mousedown", () => this.map?.closePopup());
      this.map.whenReady(() => this.handleResize());
    },

    locateUser() {
      this.map?.locate({ setView: true, maxZoom: 16 });
      this.map?.on("locationfound", (e) => {
        this.userLocation = e.latlng;
        this.map?.setView(e.latlng, 16);
        L.marker(e.latlng)
          .addTo(this.map as L.Map)
          .bindPopup("You are here")
          .openPopup();
      });
    },

    async fetchVoyages() {
      try {
        const response = await axios.get(
          "https://my-travel-log-cfax.onrender.com/api/trips"
        );
        this.trips = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des voyages :", error);
      }
    },
    filterPinsByVoyage() {
      if (!this.selectedVoyage) return;
      this.clearMarkers();
      axios
        .get<Place[]>(
          `https://my-travel-log-cfax.onrender.com/api/places?trip=${this.selectedVoyage}`
        )
        .then((response) => {
          const places = response.data;
          console.log(places); // Ajout pour vérifier les données
          const placeLatLngs: L.LatLng[] = [];
          places.forEach((place) => {
            // Assurez-vous que les coordonnées sont correctes
            const latLng = L.latLng(place.location.coordinates);
            placeLatLngs.push(latLng);
            L.marker(latLng)
              .addTo(this.map as L.Map)
              .bindPopup(
                `<strong>${place.name}</strong><br>${place.description || ""}`
              );
          });
          if (places.length > 0) {
            this.map?.fitBounds(L.latLngBounds(placeLatLngs));
          }
        })
        .catch((error) => console.error("Error fetching places:", error));
    },

    clearMarkers() {
      this.map?.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });
    },
    centerMapOnSelectedPin(place: any) {
      this.map?.setView(
        [
          place.location.coordinates.latitude,
          place.location.coordinates.longitude,
        ],
        13
      );
    },

    mapClick(e: L.LeafletMouseEvent) {
      if (this.map) {
        const selectedLocation = e.latlng;
        this.selectedLocations.push(selectedLocation);
        axios
          .get<Place[]>(
            `https://my-travel-log-cfax.onrender.com/api/places?trip=${this.selectedVoyage}`
          )
          .then((response) => {
            const places = response.data;
            const matchingPlace = places.find((place) => {
              const placeLatLng = L.latLng(place.location.coordinates);
              return placeLatLng.equals(selectedLocation);
            });
            if (matchingPlace) {
              const lieuInfo = matchingPlace.name;
              const description =
                matchingPlace.description || "Pas de description disponible";
              // Create a marker directly without checking for the associated trip
              let marker = L.marker(selectedLocation).addTo(this.map as L.Map);
              marker.on("mouseover", () => {
                marker.bindPopup(`${lieuInfo}<br>${description}`).openPopup();
              });

              // Ajout d'un gestionnaire de clics pour supprimer le marqueur
              marker.on("click", () => {
                this.map?.removeLayer(marker);
                this.selectedLocations = this.selectedLocations.filter(
                  (loc) => loc !== selectedLocation
                );
              });
            }
          })
          .catch((error) => console.error("Error fetching places:", error));
      }
    },
  },
};
</script>

<style>
#filter-container {
  position: absolute;
  top: 12vh; /* Adjusted to give some space from the top */
  left: 5vw; /* Adjusted to give some space from the left */
  z-index: 1000;
  background: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 70vh; /* Limits the height to prevent overflow */
  overflow-y: auto; /* Allows scrolling inside the container if content overflows */
}

#locate-me {
  position: absolute;
  top: 3vh; /* Position below the filter container */
  left: 25vw;
  z-index: 1000;
  padding: 10px;
  border: none;
  background-color: white; /* Bootstrap primary color for example */
  color: black;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

#locate-me:hover {
  background-color: #ffffff; /* Darken color on hover for better UX */
}

#map-container {
  height: 95vh; /* Adjusted to make sure it is not more than the viewport height */
  width: 100vw; /* Adjusted to make sure it takes full viewport width */
  position: absolute;
  top: 10vh; /* Pushes the container down to make space for the filter */
  left: 0;
  overflow: hidden; /* Prevents the map from overflowing the container */
}

#map {
  height: 100%;
  width: 100%;
}
</style>
