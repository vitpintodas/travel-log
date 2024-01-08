<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {provide} from 'vue'
import {AUTH_SERVICE, AuthService} from './security/auth-service';

provide(AUTH_SERVICE, new AuthService())
</script>
