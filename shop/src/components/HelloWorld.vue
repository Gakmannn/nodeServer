<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const likes = ref(0)
const dislikes = ref(0)


</script>

<template>
  <h1>{{ msg }}</h1>
  <div @:click="likes--">click 1</div>
  <div @:click="dislikes++">click 2</div>
  <button class="btn" @:click="likes++">лайки {{ likes }}</button>
  <button class="btn" @:click="dislikes--">{{ dislikes }}</button>
</template>

<style scoped>
  h1, .btn {
    color:yellowgreen;
  }
  div {
    border: 1px solid aliceblue;
    margin-top: 10px;
  }
  div:hover {
    border: 1px solid red;
  }
</style>
