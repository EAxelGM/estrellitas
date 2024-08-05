//import { defineStore } from 'pinia';
export const useStore = defineStore('main', () => {
  const user = ref(null);
  const alertData = ref({});

  //Actions;
  const setUser = (data:any) => {
    user.value = data;
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
    setAlertData
  }
});

if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}