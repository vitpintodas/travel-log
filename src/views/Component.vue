<!-- App.vue -->
<template>
  <div id="app">
    <h1>Vue des composants</h1>
    <Button />
    <Button_Clear />
     <Button_Plus />
    <Button_Pen/>
    <Button_Cross/>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Button_Clear from '@/components/Button_Clear.vue';
import Button_Plus from '@/components/Button_Plus.vue';
import Button_Pen from '@/components/Button_Pen.vue';
import Button_Cross from '@/components/Button_Cross.vue';

export default {
  components: {
    Button,
    Button_Clear,
    Button_Plus,
    Button_Pen,
    Button_Cross,
  },
};
</script>
