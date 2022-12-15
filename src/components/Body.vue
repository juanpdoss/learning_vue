<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { Todo } from "@/types/todo";
import BodyItem from "./BodyItem.vue";
import TodoContainer from "./TodoPill.vue";

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

    // remove the todo from the DB
    deleteTodoFromDb(indexToDelete);
  }
}

async function deleteTodoFromDb(idToDelete: number) {
  if (!idToDelete) {
    return;
  }

  // DELETE from api using id inside the url
  const endpoint = `${API_BASE_URL}todos/${idToDelete}`;
  const body: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(endpoint, body);
  const responseBody = await response.json();

  if (response.ok || response.status === 200) {
    console.log(responseBody);
    // todo .. show something to the user
  }
}

function addTodo() {
  todos.value.push({
    id: id++,
    text: newTodo.value,
    done: false,
  });
}

async function saveTodo(todo: Todo) {
  const endpoint = API_BASE_URL + "todos";

  const creationData = {
    text: todo.text,
    done: todo.done,
  };

  const body: RequestInit = {
    body: JSON.stringify(creationData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "UTF-8",
    },
  };

  await fetch(endpoint, body);
}

async function saveTodos() {
  todos.value.forEach(async (todo) => {
    await saveTodo(todo);
  });
}

async function getTodos() {
  const endpoint = API_BASE_URL + "todos";
  const response = await fetch(endpoint);
  const todosFromApi: Todo[] = await response.json();

  todos.value = todosFromApi;
  synchronizeIds(todos.value.length);
}

function synchronizeIds(lastId: number) {
  id = lastId++;
}

// Lifecycle hooks, you can use them to execute special functions on useful moments like component creation ( onMounted )
onMounted(() => {
  getTodos();
});
</script>

<style scoped>
.todos-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: -30px;
}

.todo-wrapper {
  width: 40rem;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
}

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

.user-inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.action-buttons {
  margin-top: 30px !important;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.margin-right-15 {
  margin-left: 15px !important;
}
</style>

<template>
  <BodyItem>
    <template #heading>
      <h1>My todo list using vue.js</h1>
      <h4>
        You can see your statistics

        <router-link to="statistics">
          <a href="">here</a>
        </router-link>
      </h4>
    </template>

    <div class="todos-wrapper">
      <div
        class="todo-wrapper"
        v-if="todos.length !== 0"
        v-for="todo in todos"
        :key="todo.id"
      >
        <TodoContainer :todo="todo" @on-todo-deletion="deleteTodo(todo)" />
      </div>
      <p v-else>Loading . . .</p>
    </div>
  </BodyItem>

  <div class="user-inputs">
    <h3>¡Add your todo!</h3>
    <input type="text" v-model="newTodo" />
    <div class="action-buttons">
      <button @click="addTodo()">Add</button>
      <button @click="saveTodos()" class="margin-right-15">
        Save your todos!
      </button>
    </div>
  </div>
</template>
