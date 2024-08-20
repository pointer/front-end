<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
        <div class="error-container">
          <h1 class="error-title">FOG ERROR</h1>
          <h2 class="error-code">404</h2>
          <h3 class="error-message">Page not found</h3>
          <p class="error-description">
            I tried to catch some fog, but I missed it
          </p>
          <v-btn color="primary" to="/" rounded>
            <v-icon left>mdi-home</v-icon>
            Back to Home
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional script needed for this component
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-container {
  background-color: #121212 
  /*#242424;*/
}

.error-container {
  padding: 2rem;
  color: #ffffff;
  max-width: 100%;
}

.error-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.v-btn {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
}

.v-btn:hover {
  background-color: #f0f0f0;
  color: #000000;
}
</style>
