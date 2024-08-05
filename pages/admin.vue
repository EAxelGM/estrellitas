<template>
  <div>
    <div v-if="isShowed.passwordWasCorrect">
      <div>
        <Admin />
      </div>
      <div class="mt-5">
        <Principal />
      </div>
    </div>
    <div v-else>
      <EnterPassword :isShowed="isShowed" />
    </div>
  </div>
</template>

<script setup>
import EnterPassword from "@/components/view/admin/EnterPasswordvue.vue"
import Admin from "@/components/view/admin/Admin.vue"
import Principal from "@/components/view/admin/give-stars/Principal.vue"


const isShowed = ref({
  passwordWasCorrect: true
})

</script>

<style>

</style>