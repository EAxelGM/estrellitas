<template>
  <div>
    <div>
      <UploadImges
        label="Imagen"
        :objeto="data_send"
        llave="image"
        folder="imagenes"
      />
    </div>
    <div>
      <v-text-field label="Nombre" v-model="data_send.name" />
    </div>
    <div>
      <v-text-field
        label="Esrellas Costo"
        v-model="data_send.stars_cost"
        type="number"
      />
    </div>
    <div>
      <v-textarea label="Descripcion" v-model="data_send.description" />
    </div>
  </div>
</template>

<script setup>
import UploadImges from "~/components/globals/UploadImges.vue";
const { data_send } = defineProps({
  data_send: {
    type: Object,
    default: {},
  },
});
</script>

<style>
</style>