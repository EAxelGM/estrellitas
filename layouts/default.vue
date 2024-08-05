<template>
  <v-app>
    <Nav />
    <v-main>
      <FondoEstrellas />
      <v-container >
        <slot />
      </v-container>
    </v-main>

    <Alerts />
    <Footer />
  </v-app>
</template>

<script setup>
import Nav from "@/components/view/Nav.vue";
import Footer from "@/components/view/Footer.vue";
import Alerts from "@/components/globals/Alerts.vue";
import FondoEstrellas from "@/components/view/FondoEstrellas.vue";

const getEstrellas = async () => {
  try {
    const estrellas = await firebase.getOne({rute:"stars", id:"total-stars"})
    console.log({estrellas})
    store.setEstrellas(estrellas?.total || 0)
  } catch (error) {
    responseErrors(error)
  }
}
onMounted(() => {
  getEstrellas();
})
</script>

<style>
</style>