<template>
  <div>
    <v-card class="pa-5">
      <div>
        <h2>Hola Admin</h2>
        <Create :refreshFunction="getdata" />
        <div>
          <Table :headers="headers" :items="items" :loading="loading">

            <template v-slot:[`item.image`]="{ item }">
              <div align="center" class="d-flex">
                <v-avatar :image="item.image || 'images/no-foto.png'" size="50"></v-avatar>
              </div>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
              <div>
                {{ momentPrettyFullDate(item.created_at) }}
              </div>
            </template>

            <template v-slot:[`item.updated_at`]="{ item }">
              <div>
                {{ momentPrettyFullDate(item.updated_at) }}
              </div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <div align="center" class="d-flex">
                <div>
                  <Update
                    :refreshFunction="getdata"
                    :id="item.id"
                    :info="item"
                  />
                </div>
                <div>
                  <Remove
                    :refreshFunction="getdata"
                    :id="item.id"
                    :info="item"
                  />
                </div>
              </div>
            </template>

          </Table>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import Table from '~/components/globals/Table.vue';
import Create from './item/Create.vue';
import Update from './item/Update.vue';
import Remove from './item/Remove.vue';
const headers = ref([
  {
    title: "Id",
    key: "id",
    isHidden:true
  },
  {
    title: "Imagen",
    key: "image",
  },
  {
    title: "Nombre",
    key: "name",
  },
  {
    title: "Descripcion",
    key: "description",
  },
  {
    title: "Estrellas",
    key: "stars_cost",
  },
  {
    title: "Fecha de Creacion",
    key: "created_at",
  },
  {
    title: "Fecha de actualizacion",
    key: "updated_at",
    isHidden:true
  },
  {
    title: "Acciones",
    key: "actions",
  },
])

const items = ref([]);
const loading = ref(false)

const getdata = async () => {
  try {
    const data = await firebase.getData({rute: "items"})
    items.value = data
    console.log({data})
  } catch (error) {
    responseErrors(error);
  }
}

onMounted(() => {
  getdata()
})
</script>

<style>

</style>