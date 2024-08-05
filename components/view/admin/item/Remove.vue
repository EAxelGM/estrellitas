<template>
  <div>
    <v-btn color="red" variant="text" @click="openModal = !openModal" icon>
      <v-icon>mdi-trash-can</v-icon>
    </v-btn>

    <v-dialog v-model="openModal" max-width="600" :persistent="loading">
      <v-card class="pa-5">
        <div>
          <h2>Eliminar {{ info.name }}</h2>
          <div>
            <v-row>
              <v-col>
                <v-btn block color="red" variant="text" @click="openModal=false" :disabled="loading">
                  Cancelar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block color="green" variant="text" @click="action()" :loading="loading">
                  Eliminar
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
const {refreshFunction,info, id} = defineProps({
  refreshFunction: {
    type: Function,
    default: () => {}
  },
  info: {
    type: Object,
    default: {}
  },
  id: {
    type: String,
    default: ""
  }
})


const openModal = ref(false)
const loading = ref(false)

const action = async () => {
  loading.value = true
  try {
    const data = await firebase.remove({rute:"items", id})
    refreshFunction();
    openModal.value = false;
  } catch (error) {
    responseErrors(error)
  }
  loading.value = false
  console.log({data: data_send.value})
}

</script>

<style>

</style>