<template>
  <div>
    <h1>
      Canjea tus estrellitas
    </h1>
    <v-row >
      <v-col v-for="(item, index) in itemsToChange" :key="index">
        <div>
          <CardItem :item="item" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CardItem from "@/components/profile/Card"

const itemsToChange = ref([
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    description: "Restricciones jeje",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
  {
    image: "https://picsum.photos/1200",
    stars: 50,
    name: "Item 1",
    id: 1
  },
])

const file_json_from_postman = ref(null);


</script>