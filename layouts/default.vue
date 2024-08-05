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

</script>

<style>
</style>