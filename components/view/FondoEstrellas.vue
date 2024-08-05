<template>
  <div class="fondo-estrellas-field">
    <!-- Aquí se generarán las estrellas -->
  </div>
</template>

<script setup>
 const numStars = ref(200);

 const generateStar = (starField) => {
    const star = document.createElement('div')
    star.classList.add('estrellita')
    star.style.top = `${Math.random() * 100}vh`
    star.style.left = `${Math.random() * 100}vw`
    star.style.animationDuration = `${Math.random() * 10 + 5}s`; // Duración aleatoria para cada estrella
    star.style.animationDelay = `${Math.random() * 10}s`; // Retardo aleatorio para cada estrella
    starField.appendChild(star)
 }

const initial = () => {
  const starField = document.querySelector('.fondo-estrellas-field')
  for (let i = 0; i < numStars.value; i++) {
    generateStar(starField)
  }
  addNewStart()
}

const addNewStart = () => {
  const starField = document.querySelector('.fondo-estrellas-field');

  const intervalo = setInterval(() => {
    generateStar(starField);
    if(numStars.value >= 500){
      clearInterval(intervalo)
    }else{
      numStars.value++
    }
  }, 1000)
  generateStar(starField);
}

onMounted(() => {
  initial();
})
</script>

<style>
@keyframes moveStar {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}
.fondo-estrellas-field {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Esto asegura que el fondo esté detrás del contenido */
  pointer-events: none; /* Esto asegura que el fondo no interfiera con los eventos de usuario */
  background: linear-gradient(to bottom, #000011, #001133, #112244, #334455, #556677); /* Fondo gradiente espacial */

}

.estrellita {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: moveStar linear infinite;
}
</style>