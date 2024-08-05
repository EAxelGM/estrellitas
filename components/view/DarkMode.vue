<template>
  <div>
    <v-switch
      v-model="isDarkMode"
      inset
      label="Enable Dark Mode"
      color="primary"
    />
  </div>
</template>

<script setup>
import { useTheme } from "vuetify";
const theme = useTheme();

const isDarkMode = ref(false);

const toggleTheme = () => {
  const mode = isDarkMode.value ? "dark" : "light";
  theme.global.name.value = mode;
  localStorage.setItem("darkMode", mode);
};

const getInitDarkMode = () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode) {
    isDarkMode.value = darkMode === "dark";
    toggleTheme();
  }
};

onMounted(() => {
  getInitDarkMode();
});

watch(isDarkMode, () => {
  toggleTheme();
});
</script>

<style>
</style>