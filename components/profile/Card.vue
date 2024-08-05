<template>
  <div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          :class="`pa-5 card-item${isHovering ? '-hover' : ''}`"
        >
          <div align="center">
            <div>
              <v-avatar :image="item.image" size="200"></v-avatar>
            </div>
            <div>
              <h2>{{ item.name }}</h2>
            </div>
            <div class="my-5">
              <v-btn variant="text" color="secondary" size="x-small" @click="showDescription = !showDescription">
                {{showDescription ? 'Ocultar' : 'Mostrar'}} descripcion
              </v-btn>

              <div v-show="showDescription" class="font-description">
                <div v-if="item.description">
                  holis
                </div>
                <div v-else>
                  No hay descripcion/restricciones
                </div>
              </div>
            </div>
            <div><v-icon color="yellow">mdi-star</v-icon> {{ item.stars }}</div>

            <div class="mt-5">
              <v-btn block color="yellow" variant="outlined" @click="modalConfirmation = !modalConfirmation">
                Canjear estrellitas
              </v-btn>
            </div>
          </div>
        </v-card>
      </template>
    </v-hover>

    <v-dialog v-model="modalConfirmation" max-width="600" :persistent="loading">
      <v-card class="pa-5">
        <div>
          <div align="center">
            <h4 class="mb-5">¿Estas segura de canjear tus estrellas?</h4>
            <div>
              <v-avatar :image="item.image" size="150"></v-avatar>
            </div>
            <div>
              <h2>{{ item.name }}</h2>
            </div>
            <div class="mt-5">
              <v-row>
                <v-col>
                  <v-btn @click="modalConfirmation = !modalConfirmation" variant="outlined" color="red" block="" :disabled="loading">
                    No, Cancelar
                  </v-btn>
                </v-col>
                  <v-col>

                  <v-btn variant="outlined" color="green" block :loading="loading" @click="canjearEstrellas()">
                    Si, Canjear 😋
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const { item } = defineProps({
  item: {
    type: Object,
    default: {},
  },
  refreshFunction: {
    type: Function,
    default: () => {},
  },
});
const showDescription = ref(false)
const modalConfirmation = ref(false)
const loading = ref(false)

const canjearEstrellas = async() => {
  loading.value = true
  try {
    setTimeout(() => {
      loading.value = false
      modalConfirmation.value = false
      store.setAlertData({message: "Canje exitoso!"})
    },3000)
  } catch (error) {
    console.log({error})
  }
  //loading.value = false
}
</script>

<style>
</style>