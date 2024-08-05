<template>
  <div>
    <v-card class="pa-5 card-item mb-5">
      <h2>
        Tus cositas
      </h2>
      <div class="mt-5">
        <v-btn block to="/store" variant="outlined">
          Ir a la tiendita
        </v-btn>
      </div>
    </v-card>
    <h1>
    </h1>
    <v-row >
      <v-col v-for="(item, index) in itemsToChange" :key="index">
        <div>
          <CardItemOwn :item="item" :refreshFunction="getItems" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CardItemOwn from "@/components/profile/CardOwn"

const itemsToChange = ref([])

const getItems = async () => {
  try {
    const data = await firebase.getData({rute:"compras"})
    itemsToChange.value = data
  } catch (error) {
    responseErrors(error)
  }
}

onMounted(() => {
  getItems()
})


</script>