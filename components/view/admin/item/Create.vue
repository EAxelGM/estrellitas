<template>
  <div>
    <v-btn color="green" variant="text" @click="openModal = !openModal">
      Agregar nuevo
    </v-btn>

    <v-dialog v-model="openModal" max-width="600" :persistent="loading">
      <v-card class="pa-5">
        <div>
          <h2>Nuevo</h2>
          <div>
            <Form :data_send="data_send" />
          </div>
          <div>
            <v-row>
              <v-col>
                <v-btn block color="red" variant="text" @click="openModal=false" :disabled="loading">
                  Cancelar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block color="green" variant="text" @click="action()" :loading="loading">
                  Agregar
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import Form from "./Form.vue"
const {refreshFunction} = defineProps({
  refreshFunction: {
    type: Function,
    default: () => {}
  }
})

const openModal = ref(false)
const loading = ref(false)
const data_send = ref({});

const action = async () => {
  loading.value = true
  try {
    const data = await firebase.create({rute: "items", data: data_send.value});
    refreshFunction();
    openModal.value = false;
    data_send.value = {};
  } catch (error) {
    responseErrors(error)
  }
  loading.value = false
  console.log({data: data_send.value})
}

</script>

<style>

</style>