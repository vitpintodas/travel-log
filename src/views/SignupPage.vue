<template>
  <div class="signup-form">
    <h1>Inscription</h1>
    <form @submit.prevent="handleSubmit">
      <form-field
        id="username"
        label="Nom d'utilisateur"
        type="username"
        v-model="username"
        required
        placeholder="user123"
      />
      <form-field
        id="password"
        label="Mot de passe"
        type="password"
        v-model="password"
        required
        placeholder="********"
      />
      <form-field
        id="confirm-password"
        label="Confirmation du mot de passe"
        type="password"
        v-model="confirmPassword"
        required
        placeholder="********"
      />
      <div class="form-group">
        <button type="submit">S'inscrire</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import FormField from "@/components/FormField.vue";
export default {
  components: {
    FormField,
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("Submitted!");
    },
  }
};
</script>

<style scoped>
.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
}

.signup-form h1 {
  text-align: center;
  align-self: center;
  margin-bottom: 3rem;
  margin-top: -0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  flex-direction: column;
}

.center-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
