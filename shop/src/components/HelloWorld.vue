<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const likes = ref(0)
const dislikes = ref(0)

const posts = [
  {id: 1, title:'JS', body: 'Описание поста 1'},
  {id: 2, title:'JS', body: 'Описание поста 2'},
  {id: 3, title:'JS', body: 'Описание поста 3'},
  {id: 4, title:'JS', body: 'Описание поста 4'},
]



</script>

<template>
  <h1>{{ msg }}</h1>
<div class="post" v-for="post in posts">
  <div><strong>Язык {{ post.title }}</strong><br> Пост о знакомствах {{ post.body }}</div>



  <!-- <div><strong>Название 1</strong> пост о знакомствах 1</div>
  <div><strong>Название 2</strong> пост о знакомствах 2</div>
  <div><strong>Название 3</strong> пост о знакомствах 3</div>
  <div><strong>Название 4</strong> пост о знакомствах 4</div> -->

</div>

  <div class="clc" @:click="likes--">click 1</div>
  <div class="clc" @:click="dislikes++">click 2</div>
  <button class="btn" @:click="likes++">лайки {{ likes }}</button>
  <button class="btn" @:click="dislikes--">{{ dislikes }}</button>
</template>

<style scoped>

.post>div {
  border: 1px solid lightgreen;
  padding: 10px;
  margin: 20px;
}
  h1, .btn {
    color:yellowgreen;
  }
  .btn, .clc {
    border: 1px solid aliceblue;
    margin-top: 10px;
  }
  .btn:hover, .clc:hover {
    border: 1px solid red;
  }
</style>
