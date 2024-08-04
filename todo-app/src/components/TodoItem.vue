<template>
    <div class="row">
        <div class="col-2">
            <input type="checkbox" v-model="localTodo.completed" @change="updateTodo" class="todo-checkbox p-3" />
        </div>
        <div class="col-8 px-0">
            <input v-if="editing" v-model="localTodo.text" @keyup.enter="finishEdit" @blur="finishEdit" ref="editInput"
                class="editable-input  form-control  d-flex jusitfy-content-start" />
            <span v-if="!editing" :class="{ completed: todo.completed, 'flex-grow-1': !editing }" @dblclick="editTodo">
                <p class="mb-1">{{
                    todo.text
                    }}</p>
            </span>
        </div>
        <div class=" col-2">
            <button @click="$emit('delete')" class="common-button btn btn-danger btn-sm">x</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            localTodo: { ...this.todo },
            editing: false,
        };
    },
    methods: {
        editTodo() {
            this.editing = true;
            // trigerred when DOM is rendered
            this.$nextTick(() => {
                this.$refs.editInput.focus();
            });
        },
        finishEdit() {
            if (!this.localTodo.text.trim()) {
                this.$emit('delete');
            } else {
                this.updateTodo();
            }
            this.editing = false;
        },
        updateTodo() {
            this.$emit('update', { ...this.localTodo });
        },
    },
    watch: {
        todo: {
            handler(newVal) {
                this.localTodo = { ...newVal };
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
@import '../assets/common-button.css';

.todo-checkbox {
    height: 23px;
    width: 45px;
}

.completed {
    text-decoration: line-through;
}

.editable-input {
    position: relative;
    bottom: 8px;
    height: 35px;
    padding: 4px;
    margin: 4px;
    z-index: 5;
}
</style>