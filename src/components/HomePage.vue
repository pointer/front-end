<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-4">Bienvenue dans l'application de suivi des efforts</h1>
        <p class="text-subtitle-1">Gérez votre effort efficacement grâce à notre plateforme facile à utiliser</p>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col v-for="(feature, index) in features" :key="index" cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-text class="text-center">
            <v-icon size="48" color="primary" class="mb-4">{{ feature.icon }}</v-icon>
            <h2 class="text-h5 font-weight-bold mb-2">{{ feature.title }}</h2>
            <p>{{ feature.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="feature.link" color="primary" text>Savoir plus</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-btn color="primary" large :to="'/login'">Commencer</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: 'mdi-clock-outline',
    title: 'Suivi des efforts',
    description: 'Suivi du temps simple et précis pour tous vos projets.',
    link: '/time-sheet'
  },
  {
    icon: 'mdi-account-group',
    title: 'Gestion des utilisateurs',
    description: 'Gérez efficacement les utilisateurs et leurs rôles.',
    link: '/user-data'
  },
  {
    icon: 'mdi-chart-bar',
    title: 'Rapports',
    description: 'Générez des rapports perspicaces pour une meilleure prise de décision.',
    link: '/admin'
  }
])
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
