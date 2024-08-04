<template>
    <h1>Todo App</h1>
    <hr />
    <div>
        <div class="input-group mb-3">
            <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo Item " class="form-control" />
            <div class="input-group-append">
                <button class="btn btn-success btn-outline-success" @click="addTodo">Add Todo</button>
            </div>
        </div>
        <ul class="list-group p-0">
            <TodoItem v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @delete="deleteTodo(index)"
                @update="updateTodo(index, $event)" />
        </ul>
        <div class="mt-3">
            <button @click="setFilter('all')"
                :class="['btn', filter === 'all' ? 'btn-primary' : 'btn-outline-primary']">
                All
            </button>
            <button @click="setFilter('active')"
                :class="['btn', filter === 'active' ? 'btn-primary' : 'btn-outline-primary']">
                Active
            </button>
            <button @click="setFilter('completed')"
                :class="['btn', filter === 'completed' ? 'btn-primary' : 'btn-outline-primary']">
                Completed
            </button>
            <p v-if="filter !== 'all'">
                {{ filteredTodos.length }} {{ itemLabel }}
            </p>
            <hr />
            <button @click="clearCompleted"
                :class="['btn', 'float-right mt-2', filter === 'completed' ? 'btn-primary' : 'btn-outline-primary']">
                Clear Completed
            </button>

        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
    name: 'TodoList',
    components: {
        TodoItem,
    },
    data() {
        return {
            newTodo: '',
            todos: [],
            filter: 'all',
        };
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'active') {
                return this.todos.filter((todo) => !todo.completed);
            } else if (this.filter === 'completed') {
                return this.todos.filter((todo) => todo.completed);
            } else {
                return this.todos;
            }
        },
        itemLabel() {
            return this.filteredTodos.length === 1 ? 'Item' : 'Items';
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({ text: this.newTodo, completed: false });
                this.newTodo = '';
            }
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        updateTodo(index, updatedTodo) {
            this.todos.splice(index, 1, updatedTodo);
        },
        clearCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed);
        },
        setFilter(filter) {
            this.filter = filter;
        },
    },
};
</script>

<style scoped>
.btn {
    margin-right: 5px;
}
</style>