<!-- Button.vue -->
<template>
  <ion-button color="dark">{{ buttonText }}</ion-button>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: { IonButton },
  props: {
    buttonText: {
      type: String as PropType<string>,
      default: 'Je suis un Bouton',
    },
  },
});
</script>
