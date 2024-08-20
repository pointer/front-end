<template>
    <v-btn @click="Logout" color="error" dark>
        Logout
    </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    localStorage.removeItem('role')
    localStorage.removeItem('token_type')
    localStorage.removeItem('working_days')
    router.push({
        name: 'Home'
    })
}
</script>