<template>
    <div class="card todo-card" style="width: 30rem;">
        <div class="card-body">
            <h1>Todo App</h1>
            <hr />
            <div>
                <div class="add-item-wrapper input-group mb-3 d-flex gap-2">
                    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo Item "
                        class="form-control" />
                    <div class="input-group-append">
                        <button class="btn btn-success common-button" @click="addTodo">Add
                            Todo</button>
                    </div>
                </div>
                <div class="todo-layout-wrapper pt-2">
                    <TodoItem v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"
                        @delete="deleteTodo(index)" @update="updateTodo(index, $event)" />
                </div>
                <div class="mt-3 p-2">
                    <div v-for="option in filterOptions" :key="option" class="d-inline-block">
                        <button @click="setFilter(option)"
                            :class="['btn m-2 common-button', filter === option ? 'btn-primary' : 'common-button btn-primary']">
                            {{ option.toUpperCase() }}
                        </button>
                    </div>
                    <p v-if="filter !== 'all'">
                        {{ filteredTodos.length }} {{ itemLabel }}
                    </p>
                    <hr />
                    <button @click="clearCompleted"
                        :class="['btn common-button', 'float-right mt-2', filter === 'completed' ? 'btn-primary' : 'common-button btn-primary']">
                        Clear Completed
                    </button>

                </div>
            </div>
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
            filterOptions: ['all', 'active', 'completed'],
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
@import '../assets/common-button.css';

.todo-layout-wrapper {
    max-height: 360px;
    overflow: scroll;
}


.todo-card {
    padding: 12px;
    border-radius: 12px;
}

.add-item-wrapper {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgb(235 242 235);
}
</style>