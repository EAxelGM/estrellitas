<template>
  <div>
    <v-card class="pa-5">
      <div>
        <h1>
          Ingresa la contrseña
        </h1>
        <div>
          <v-text-field v-model="password" type="password" />
        </div>
        <div >
          <v-btn block color="red" variant="outlined" @click="verifyPassword()">Ingresar</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
const {isShowed} = defineProps({
  isShowed: {
    type: Object,
    default: {}
  }
})

const password = ref("");

const verifyPassword = () => {
  if(password.value === "karlita-"){
    isShowed.passwordWasCorrect = true
  }else{
    store.setAlertData({message: "La contraseña no es correcta", color:"red"})
  }
}


</script>

<style>

</style>