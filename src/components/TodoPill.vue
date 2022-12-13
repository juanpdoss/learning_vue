<script setup lang="ts">
import type { Todo  } from "./Body.vue";
import { defineEmits } from "vue";

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(["onTodoDeletion"]);

function deleteTodo() {
    emit("onTodoDeletion");
}
</script>

<template>
  <div class="greetings">
    <h1 class="green" :class="" >{{ todo.text }}</h1>
    <button @click="deleteTodo()">Delete</button>
  </div>
</template> 

<style scoped>
.greetings {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
