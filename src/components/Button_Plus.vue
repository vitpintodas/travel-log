<!--<template>
  <ion-fab>
    <ion-fab-button color="dark" size = "small">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
  import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
  import { add } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonFab, IonFabButton, IonIcon },
    setup() {
      return { add };
    },
  });
</script>-->
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