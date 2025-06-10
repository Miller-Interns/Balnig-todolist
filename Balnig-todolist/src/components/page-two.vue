<script setup lang="ts">
import { useLogic } from '@/composables/use-logic'

const {
  todoCategory,
  newCategory,
  newTodoItem,
  addCategory,
  delCategory,
  editCategory,
  addTodoItem,
  delTodoItem,
  editTodoItem,
  toggleTodoItem,
  allTodoItems
} = useLogic()
</script>

<template>
  <div class="heading">
        <h1 style="font-weight: bold">{{"TODO List Exercise"}}</h1>
  </div>

  <div class="page-two">
    <form @submit.prevent="addCategory">
      <input v-model="newCategory" placeholder="Add New Category" required/>
      <button type="submit">Add Category</button>
    </form>
    
    <div v-for="cat in todoCategory" :key="cat.id" class="category-box">
      <input v-model="cat.title" @blur="editCategory(cat.id, cat.title)" 
      class="category-title"/>
      <button @click="delCategory(cat.id)">Delete Category</button>

    <form @submit.prevent="addTodoItem(cat.id)">
      <input v-model="newTodoItem[cat.id]" placeholder="Add New Item" required/>
      <button type="submit">Add Item</button>
    </form>

      <div v-for="item in cat.items" :key="item.id">
        <input type="checkbox" :checked="item.done" 
        @change="toggleTodoItem(cat.id, item.id)" />
        <input v-model="item.title" 
        @blur="editTodoItem(cat.id, item.id, item.title)" :class="{done:item.done}"/>
        <button @click="delTodoItem(cat.id, item.id)">Delete Item</button>
      </div>
    </div>
  </div>

  <div class="back-btn">
    <button style="background-color: hsl(60, 90%, 50%); color: rgb(0, 0, 0);" 
    @click="$router.push('/')">Back</button>
  </div>

  <div class="seeAll">
    <h2>All TO-DO Items</h2>
    <div v-for="item in allTodoItems" :key="item.id">
      <input type="checkbox" :checked="item.done" 
      @change="toggleTodoItem(item.categoryId, item.id)" />
      <span :class="{ done: item.done }">{{ item.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.heading {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  padding: 0.5rem;
  color: black;
  z-index: 15;
}

.page-two {
  position: absolute;
  top: 15%;
  left: 65%;
  transform: translate(-50%);
  text-align: center;
  padding: 1rem;
  max-width: 800px;
  background-color: #fef9e7;
  overflow-y: auto;
  max-height: 70vh;
  z-index:5;
}

.category-box {
  background: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-top: 1rem;
  border-radius: 5px;
}

.category-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.seeAll {
  position: absolute;
  top: 15%;
  left: 25%;
  transform: translate(-50%);
  text-align: left;
  padding: 0.5rem;
  max-width: 350px;
  color: black;
  background-color: #fef9e7;
  overflow-y: auto;
  max-height: 70vh;
  z-index: 15;
}

.seeAll span{
  display: inline-block;
  vertical-align: top;
  max-width: 90%;
  word-break: break-word;
  white-space: normal;
}

.back-btn button{
  position: absolute;
  top: 10%;
  left: 20%;
  padding: 0.3rem 0.3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
}
</style>