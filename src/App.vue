<script setup lang="ts">
import HeaderTitle from "./components/HeaderTitle.vue";
import Body from "./components/Body.vue";





</script>

<template>
  <div class="parent-wrapper" id="app">
    <header>
      <div class="wrapper">
        <!-- using defined "msg variable defined in HeaderTitle.value with defineProps" -->
        <HeaderTitle msg="Vue basic aspects" />
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>

</template>
<style scoped>
.parent-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  scroll-behavior: auto;
  padding: auto;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
