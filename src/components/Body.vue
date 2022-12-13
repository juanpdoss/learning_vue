<script setup lang="ts">
import BodyItem from "./BodyItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import TodoContainer from "./TodoPill.vue";
import { ref } from "vue";

export interface Todo {
  id: number;
  text: string;
  done: boolean; 
}

// scoped variable
let id = 0;

let todos = ref<Todo[]>([
  { id: id++, text: "Water the plants", done: false },
  { id: id++, text: "Eat", done: false },
  { id: id++, text: "Drink tea", done: false },
]);

function deleteTodo(todo: Todo) {
  const indexToDelete = todos.value.findIndex((todoElement) => {
    return todoElement.id === todo.id;
  });


  if (indexToDelete !== -1) {
    console.log(todos.value);

    todos.value.splice(indexToDelete, 1);

    console.log(todos.value);
  }
}
</script>

<template>
  <BodyItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </BodyItem>
  <!-- here we are using <slot/ > to insert an icon -->
  <BodyItem>
    <template #heading>
      <h1>My todo list using vue.js</h1>
    </template>

    <li v-for="todo in todos" :key="todo.id">
      <TodoContainer :todo="todo" @on-todo-deletion="deleteTodo(todo)" />
    </li>
  </BodyItem>

  <BodyItem>
      <template #heading>¡Add your todo!</template>
  </BodyItem>

</template>
