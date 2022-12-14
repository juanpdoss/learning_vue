<script setup lang="ts">
import type { Todo } from "@/types/todo";
import { defineEmits, ref, toRefs } from "vue";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(["onTodoDeletion"]);
const isCursorInsideBox = ref(false);
const { todo } = toRefs(props);

function changeCursorInsideBoxState() {
  isCursorInsideBox.value = !isCursorInsideBox.value;
}

function deleteTodo() {
  emit("onTodoDeletion");
}

function markTodoAsDone() {
  todo.value.done = true;
}
</script>

<template>
  <div
    class="parent-wrapper"
    :class="{ selected: isCursorInsideBox }"
    @mouseenter="changeCursorInsideBoxState()"
    @mouseleave="changeCursorInsideBoxState()"
    @click="markTodoAsDone()"
  >
    <div class="todo-container">
      <h1 class="green" :class="{ done: todo.done }">{{ todo.text }}</h1>
      <button @click="deleteTodo()">Delete</button>
    </div>

    <p v-if="isCursorInsideBox">Click to mark as done!</p>
  </div>
</template>

<style scoped>
.todo-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}
.parent-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.done {
  text-decoration: line-through;
}
.selected {
  border-radius: 15px;
  background-color: #b4f1e3;
  padding: 20px;
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
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
