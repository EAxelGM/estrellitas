<template>
  <div>
    <v-card class="pa-5">
      <div>
        <h2>Total Estrellas de Karlita: {{ store.estrellas }} <v-icon>mdi-star</v-icon></h2>
        <div>
          <v-btn color="green" variant="outlined" @click="openModalDarEsrellas = !openModalDarEsrellas">
            Dar estrellas
          </v-btn>
      </div>
        <v-responsive class="pa-4" max-height="400" >
          <div v-for="(hist, index) in historial" :key="index">
            <div>
              <v-card class="pa-4 mb-5">
                <div>
                  diste {{ hist.quantity }} estrellas, por esta razon: {{ hist.description }}
                  <div class="d-flex justify-end">
                    <small>Fecha: {{ momentPrettyFullDate(hist.created_at) }}</small>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </v-responsive>
      </div>
    </v-card>

    <v-dialog v-model="openModalDarEsrellas" max-width="700">
      <v-card class="pa-5">
        <div>
          <h3>
            Dar estrellas a Karlita
          </h3>
          <div>
            <div>
              <v-text-field v-model="formulario_dar_estrellas.quantity" label="Cantidad de estrellas" type="number" />
            </div>
            <div>
              <v-textarea v-model="formulario_dar_estrellas.description" label="Motivo" />
            </div>
          </div>
          <div>
            <v-row>
              <v-col>
                <v-btn color="green " variant="outlined" block @click="darEstrellas()" :loading="loading">
                  Dar Estrellas
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
const openModalDarEsrellas = ref(false)
const loading = ref(false);
const formulario_dar_estrellas = ref({})
const historial = ref([])

const darEstrellas = async () => {
  loading.value = true
  try {
    const data = await firebase.create({rute:"history_stars", data:formulario_dar_estrellas.value});
    const totalStars = store.estrellas
    const updateStars = await firebase.createWithIdEspecific({rute:"stars", id:"total-stars", data: {total: parseInt(`${totalStars}`)+parseInt(`${data.quantity}`)}})
    store.setEstrellas(updateStars?.total || 0)
    openModalDarEsrellas.value = false
    getHistorial();
  } catch (error) {
    responseErrors(error)
  }
  loading.value = false
}

const getHistorial = async () => {
  try {
    const history = await firebase.getData({rute: "history_stars"});
    historial.value = history.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  } catch (error) {
    responseErrors(error)
  }
}

onMounted(() => {
  getHistorial()
})

</script>

<style>

</style>