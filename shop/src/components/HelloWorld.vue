<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const likes = ref(0)
const dislikes = ref(0)



let title = ''
let body = ''
 
   let posts = [
      {title:1, info: 'topic 1' },
      {title:2, info: 'topic 2' },
      {title:3, info: 'topic 3' },
      {title:4, info: 'topic 4' },
    ]
 

methods: {
    function createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
        this.posts.push(newPost);  
        this.title = '';
        this.body = '';
  }
}

</script>


<template>
  <h1>{{ msg }}</h1>

  <form @submit.prevent>
    <input v-bind:value="title" @input="title = $event.target.value" type="text" placeholder="Название">
    <input v-bind:value="body" @input = "body = $event.target.value" type="text" placeholder="Описание">
    <button class="btn_create" @click="createPost()"> Создать</button>
  </form>


  <div v-for="post of posts">
    <div class="post">number {{ post.title }}; JavaScript topic {{ post.info }}</div>
  </div>
   

  <!-- <div><strong>Название 1</strong> пост о знакомствах 1</div>
  <div><strong>Название 2</strong> пост о знакомствах 2</div>
  <div><strong>Название 3</strong> пост о знакомствах 3</div>
  <div><strong>Название 4</strong> пост о знакомствах 4</div> -->


  <div class="clc" @:click="likes--">click 1</div>
  <div class="clc" @:click="dislikes++">click 2</div>
  <button class="btn" @:click="likes++">лайки {{ likes }}</button>
  <button class="btn" @:click="dislikes--">{{ dislikes }}</button>
</template>

<style scoped>

.post{
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
  input {
    border: 1px solid red;
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    border-radius: 3px;
  }
  input:hover {
    border: 1px solid rgb(202, 197, 205);
   }
  .btn_create {
    margin-top: 15px;
    margin-left: 85%;
  }
  
</style>
