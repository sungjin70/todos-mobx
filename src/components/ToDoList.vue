<template>

    <v-card class="elevation-12">
        <v-toolbar dark :color="done ? 'blue lighten-1' : 'gray lighten-2'">
            <v-toolbar-title>Todos Done</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <ul>
            <li v-for="(todo, i) in todoList"
                :key="i"
                :class="{ active: todoStore.selectedTodoId === todo.id }"
                class="transition-swing text-subtitle-1"
                @click="todoStore.setSelectedTodoId(todo.id)">
                {{ todo.title }} 
                <v-spacer></v-spacer>
                <v-chip
                    v-if="todo.isBusiness"
                    class="ma-2 text-subtitle-3"
                    color="green"
                    text-color="white"
                    >
                    Business
                </v-chip>
                <v-chip
                    v-if="todo.isPrivate"
                    class="ma-2 text-subtitle-3"
                    color="secondary"
                    text-color="white"
                    >
                    Private
                </v-chip>
            </li>
        </ul>
        </v-card-text>
    </v-card>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {todoStore} from '../models/todoList';
import { Observer } from "mobx-vue";
/**
 * ToDo 목록 출력 컴포넌트
 * 
 * A component that display the to-do list
*/
@Observer
@Component
export default class extends Vue {
    /**
     * to-do 목록의 완료 전과 후 구분
     * 
     * A property that distinguish before and after completion of this to-do list
    */
    @Prop()
    private done! : boolean;

    private todoStore = todoStore;

    get todoList() {
        if (this.done)
            return this.todoStore.doneTodos;
        else
            return this.todoStore.undoneTodos;
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
}

li {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    padding-left: 8px;
    cursor: pointer;
}

li.active {
    background-color: rgb(226, 226, 236);
}
</style>