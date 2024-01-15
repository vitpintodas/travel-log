<template>
  <ion-button shape="round" color="dark">
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
  });
</script>