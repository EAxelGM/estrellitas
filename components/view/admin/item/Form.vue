<template>
  <div>
    <div>
      <v-text-field label="Nombre" v-model="data_send.name" />
    </div>
    <div>
      <v-text-field label="Esrellas Costo" v-model="data_send.stars_cost" type="number" />
    </div>
    <div>
      <v-textarea label="Descripcion" v-model="data_send.description" />
    </div>
  </div>
</template>

<script setup>
const {data_send} = defineProps({
  data_send: {
    type: Object,
    default:{}
  }
})

</script>

<style>

</style>