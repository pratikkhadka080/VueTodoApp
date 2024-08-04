<template>
  <div id="app" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
