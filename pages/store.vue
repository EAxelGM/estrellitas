<template>
  <div>
    <v-card class="pa-5 card-item mb-5">
      <h2>Tiendita</h2>
      <div class="mt-5">
        <v-btn block to="/" variant="outlined"> Ir a mis cositas </v-btn>
      </div>
    </v-card>
    <h1></h1>
    <v-row>
      <v-col v-for="(item, index) in itemsToChange" :key="index">
        <div>
          <CardItem :item="item" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CardItem from "@/components/profile/Card";

const itemsToChange = ref([]);

const getItems = async () => {
  try {
    const data = await firebase.getData({ rute: "items" });
    itemsToChange.value = data;
  } catch (error) {
    responseErrors(error);
  }
};

onMounted(() => {
  getItems();
});
</script>