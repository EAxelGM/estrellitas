<template>
  <div>
    <div class="pa-5">
      <div align="center">
        <div>
          <v-avatar size="200">
            <v-img :src="url_foto_actual || '/images/no-foto.png'" />
          </v-avatar>
        </div>
        <div class="mt-5">
          <v-btn @click="dialog = !dialog" color="primary">
            Cambiar Foto
          </v-btn>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <div class="d-flex flex-justify-end">
          <v-spacer />
          <v-btn @click="dialog = !dialog" icon variant="text">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
        <div class="pa-5">
          <div align="center">
            <div>
              <v-avatar size="200">
                <v-img :src="new_foto || '/images/no-foto.png'" />
              </v-avatar>
            </div>
            <div class="my-5">
              <v-file-input
                v-model="foto"
                label="Nueva Foto (Tamaño Máximo 5MB)"
                dense
                accept="image/*"
                prepend-icon="mdi-camera"
                counter
                :show-size="1000"
                @change="validarImagen()"
              />
            </div>
            <div>
              <v-btn
                color="primary"
                :loading="loading"
                @click="changeImageProfile()"
                :disabled="!foto"
              >
                Guardar Cambios
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const { url_foto_actual, refreshFunction } = defineProps({
  url_foto_actual: {
    type: String,
    default: "/images/no-foto.png",
  },
  refreshFunction:{
    type: Function,
    default: ()=>{}
  }
}
);

const dialog = ref(false);
const new_foto = ref("/images/no-foto.png");
const foto = ref(null);
const loading = ref(null);

const validarImagen = () => {
  if (foto.value) {
    if (foto.value.size > 5242880) {
      alert("No se aceptan imagenes con más de 5 MB");
      foto.value = null;
      return;
    }
    var img = new Image();
    img.src = URL.createObjectURL(
      foto.value,
      (new_foto.value = foto.value.name)
    );
    new_foto.value = img.src;
  } else {
    new_foto.value = "/images/no-foto.png";
  }
};

const changeImageProfile = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("imagen_perfil", foto.value);
    const { data } = await axiosBackend.post("/users/change-image", formData);

    dialog.value = false;
    foto.value = null;
    validarImagen();
    await refreshFunction();
  } catch (error) {
    responseErrors(error);
  }
  loading.value = false;
};
</script>

<style>
</style>