<template>
  <div>
    <v-card class="pa-5 elevation-0">
      <div align="center">
        <div>
          <v-avatar size="200">
            <v-img :src="objeto[llave] || '/images/no-foto.png'" :alt="'foto'" />
          </v-avatar>
        </div>

        <div class="mt-5">

        </div>

        <div class="mt-5">
          <v-btn @click="dialog = !dialog" color="primary">Subir Foto foto</v-btn>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          <v-spacer />
          <v-btn @click="dialog = !dialog" icon>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <div class="pa-5">
          <div align="center">
            <div>
              <v-avatar size="200">
                <v-img :src="objeto[llave] || new_foto" />
              </v-avatar>
            </div>
            <div class="mt-5">
              <v-file-input v-model="foto" label="Nueva foto (Tamaño máximo 5MB)" filled dense prepend-icon="mdi-camera" counter @change="validarImagen()" />
            </div>
            <div style="text-align: center;" class="mb-4">
              <v-btn color="primary" :loading="loading" @click="ChangeImageProfile()" :disabled="!foto"> Subir Imagen </v-btn>
            </div>
            <div>
              <v-textarea v-model="objeto[llave]" :label="label || 'Url Imagen'" filled />
            </div>
            <div style="text-align: center;">
              <v-btn color="primary" text :disabled="loading" block @click="dialog = false"> Cerrar </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const {
    label,
    objeto,
    llave,
    folder
  } = defineProps({
    label:{
      type:String,
      default:'Imagen'
    },
    objeto:{
      type:Object,
      default:{}
    },
    llave:{
      type:String,
      default:''
    },
    folder: {
      type: String,
      default: "profiles"
    }
  })

  const dialog = ref(false)
  const loading = ref(false)
  const new_foto = ref("/images/no-foto.png")
  const foto = ref(null)

  const validarImagen = () => {
      if (foto.value) {
        if (foto.value.size > 5242880) {
          alert('No se aceptan imagenes con más de 5MB')
          foto.value = null
          return
        }
        let img = new Image()
        img.src = URL.createObjectURL(foto.value, (new_foto.value = foto.value.name))
        new_foto.value = img.src
      } else {
        new_foto.value = '/images/no-foto.png'
      }
    }

    const ChangeImageProfile = async() => {
      loading.value = true
      try {
        const pathReference = await firebase.uploadFiles(foto.value, "images");
        objeto[llave] = pathReference
      } catch (error) {
        responseErrors({error})
      }
      loading.value = false
    }
</script>