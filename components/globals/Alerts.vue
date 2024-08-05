<template>
  <div v-if="store?.alertData">
    <v-snackbar
      v-model="store.alertData.message"
      :timeout="store.alertData.timedefault"
      :color="store.alertData.color"
      rounded="pill"
    >
      {{ store.alertData.message }}

      <template v-slot:actions>
        <v-btn
          color="store.alertData.message"
          variant="text"
          @click="store.setAlertData({message: null, color: store.alertData.color })"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>