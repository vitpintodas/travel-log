<template>
  <ion-icon class="clickable" :icon="close"></ion-icon>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { close } from 'ionicons/icons';

export default defineComponent({
  components: { IonIcon },
  setup() {
    return { close };
  },
});
</script>

<style scoped>
.clickable {
  font-size: 24px; /* Ajustez la taille de l'icône selon vos besoins */
  cursor: pointer;
}
</style>
