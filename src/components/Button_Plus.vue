<template>
  <ion-button shape="round" color="blue" @click="handlePlusClick">
    <ion-icon slot="icon-only" :icon="add"></ion-icon>
  </ion-button>
</template>

<script lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { add } from 'ionicons/icons';

export default defineComponent({
  components: { IonButton, IonIcon },
  setup() {
    return { add };
  },
  methods: {
    handlePlusClick() {
      // Émettre un événement ou exécuter une fonction callback
      // pour informer le composant parent que le bouton "Plus" a été cliqué.
      // Par exemple, vous pourriez utiliser un événement ou une fonction
      this.$emit('plusClick');
    },
  },
});
</script>
