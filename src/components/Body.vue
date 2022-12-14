<script setup lang="ts">
import { ref, onMounted } from "vue";
import BodyItem from "./BodyItem.vue";
import TodoContainer from "./TodoPill.vue";
import type { Todo } from "@/types/todo";

const API_BASE_URL = "http://localhost:3000/";

// scoped variable
let id = 0;

let todos = ref<Todo[]>([]);

let newTodo = ref<string>("");

function deleteTodo(todo: Todo) {
  const indexToDelete = todos.value.findIndex((todoElement) => {
    return todoElement.id === todo.id;
  });

  if (indexToDelete !== -1) {
    todos.value.splice(indexToDelete, 1);
  }
}

function addTodo() {
  todos.value.push({
    id: id++,
    text: newTodo.value,
    done: false,
  });
}

async function getTodos() {
  const endpoint = API_BASE_URL + "todos";
  const response = await fetch(endpoint);
  const todosFromApi: Todo[] = await response.json();

  todos.value = todosFromApi;
}

onMounted(() => {
  getTodos();
});
</script>

<style scoped>
button {
  background-color: #3debc3; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 15px;
}

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>

<template>
  <!-- here we are using <slot/ > to insert an icon -->
  <BodyItem>
    <template #heading>
      <h1>My todo list using vue.js</h1>
    </template>

    <li v-if="todos.length !== 0" v-for="todo in todos" :key="todo.id">
      <TodoContainer :todo="todo" @on-todo-deletion="deleteTodo(todo)" />
    </li>
    <p v-else>Loading . . .</p>
  </BodyItem>

  <BodyItem>
    <template #heading>¡Add your todo!</template>

    <div class="inputs">
      <input type="text" v-model="newTodo" />
      <button @click="addTodo()">Add</button>
    </div>
  </BodyItem>
</template>
