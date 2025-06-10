<script setup lang="ts">
    const fullName = 'Janess H. Balnig'
    const startingDate = 'Starting Date: June 6, 2025'
    const buttonName = 'Go to app'
</script>

<template>
    <div class="makeItCenter">
        <h1>{{ fullName }}</h1>
        <h2>{{ startingDate }}</h2>
        <button @click="$router.push('/todo')">{{ buttonName }}</button>
    </div>
</template>

<style scoped>
.makeItCenter {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
   padding: 1rem;
   color: black;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: hsl(60, 90%, 50%);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>