<template>
  <ion-icon class="clickable" :icon="pencil"></ion-icon>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { pencil } from 'ionicons/icons';

export default defineComponent({
  components: { IonIcon },
  setup() {
    return { pencil };
  },
});
</script>

<style scoped>
.clickable {
  font-size: 24px; /* Ajustez la taille de l'icône selon vos besoins */
  cursor: pointer;
}
</style>
