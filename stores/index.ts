//import { defineStore } from 'pinia';
export const useStore = defineStore('main', () => {
  const user = ref(null);
  const estrellas = ref(0);
  const alertData = ref({});

  //Actions;
  const setUser = (data:any) => {
    user.value = data;
  }
  const setEstrellas = (data:any) => {
    estrellas.value = data;
  }
  const setAlertData = ({message="Success", timedefault=2000, color="green"}) => {
    alertData.value = {
      message: message,
      timedefault: timedefault,
      color: color
    };
  }

  return {
    user,
    setUser,

    alertData,
    setAlertData,

    estrellas,
    setEstrellas
  }
});

if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}