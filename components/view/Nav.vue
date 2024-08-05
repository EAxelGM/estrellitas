<template>
  <div>
    <v-app-bar
      class="px-2"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right,#00001170, #55667770"
        ></v-img>
      </template>

      <template v-slot:prepend v-if="store.user">
        <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <div class="d-flex align-center justify-center" style="gap: 10px">
          <div>
            Tienes 9999 <v-icon color="#dee600" size="small" >mdi-star</v-icon>
          </div>
        </div>
      </v-app-bar-title>

    </v-app-bar>
  </div>
</template>

<script setup>
import DarkMode from "./DarkMode.vue"
</script>

<style>
</style>