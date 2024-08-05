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
              <v-avatar :image="item.item_info.image || 'images/no-foto.png'" size="200"></v-avatar>
            </div>
            <div>
              <h2>{{ item.item_info.name }}</h2>
            </div>
            <div class="my-5">
              <v-btn variant="text" color="secondary" size="x-small" @click="showDescription = !showDescription">
                {{showDescription ? 'Ocultar' : 'Mostrar'}} descripcion
              </v-btn>

              <div v-show="showDescription" class="font-description">
                <div v-if="item.item_info.description">
                  {{item.item_info.description}}
                </div>
                <div v-else>
                  No hay descripcion/restricciones
                </div>
              </div>
            </div>

            <div class="mt-5">
              <v-btn block :color="item.used ? 'red' : 'green'" variant="outlined" @click="changeUsado()" :loading="loading">
                {{item.used ? 'Ya Usado' : 'No Usado'}}
              </v-btn>
            </div>
          </div>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script setup>
const { item, refreshFunction } = defineProps({
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

const changeUsado = async() => {
  loading.value = true
  try {
    let pass = prompt("Contraseña");
    if(pass !== contrasenaMaestra()){
      throw{
        message: "Contraseña incorrecta"
      }
    }

    const update = await firebase.update({
      rute: "compras",
      id: item.id,
      data: {used: !item.used}
    })
    refreshFunction()
  } catch (error) {
    responseErrors(error)
  }
  loading.value = false
}
</script>

<style>
</style>