<template>
    <li class="list-group-item d-flex align-items-center">
        <input type="checkbox" v-model="localTodo.completed" @change="updateTodo" class="form-check-input me-2" />
        <input v-if="editing" v-model="localTodo.text" @keyup.enter="finishEdit" @blur="finishEdit" ref="editInput"
            class="editable-input form-control  d-flex jusitfy-content-start position-relatives" />
        <span v-if="!editing" :class="{ completed: todo.completed, 'flex-grow-1': !editing }" @dblclick="editTodo">
            <span>{{
                todo.text }}</span>
        </span>
        <button @click="$emit('delete')" class="btn btn-danger btn-sm">x</button>
    </li>
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
.completed {
    text-decoration: line-through;
}

li {
    display: flex;
    align-items: center;
}

input[type='text'] {
    flex-grow: 1;
    border: none;
}

input[type='text']:focus {
    outline: none;
}

.editable-input {
    width: 90%;
    /* z-index: 5;
    background-color: white; */
}
</style>