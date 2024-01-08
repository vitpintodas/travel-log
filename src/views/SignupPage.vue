<template>
  <div class="signup-form">
    <h1>Inscription</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>

        <input
          type="username"
          id="username"
          v-model="username"
          required
          placeholder="user123"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="*****"
        />
      </div>
      <div class="form-group">
        <label for="password">Confirmation du mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="*****"
        />
      </div>
      <div class="form-group">
        <button type="submit">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

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
