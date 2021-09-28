<template>
    <v-card class="elevation-12">
        <v-toolbar dark :color="todoStore.selectedTodoId >= 0 ? 'red lighten-1':'pink lighten-1'">
            <v-toolbar-title>{{ todoStore.selectedTodoId >= 0 ? 'Edit Todo' : 'Create Todo' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close()" >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="todoStore.editTodo.title"
                    :counter="20"
                    :rules="titleRules"
                    label="title"
                    required
                ></v-text-field>
                <v-checkbox
                    v-model="todoStore.editTodo.isDone"
                    label="Is this todo done?"
                ></v-checkbox>
                <v-checkbox
                    v-model="todoStore.editTodo.isPrivate"
                    label="Private"
                ></v-checkbox>
                <v-checkbox
                    v-model="todoStore.editTodo.isBusiness"
                    label="Business"
                ></v-checkbox>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="save()"
                >
                Save
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {todoStore} from '../models/todoList';
import {appVarStore} from '../models/appFlow';
import { Observer } from "mobx-vue";

/**
 * 새 ToDo를 추가하거나 선택된 ToDo를 편집하는 컴포넌트
 * 
 * A component that adds a new ToDo or edits a selected ToDo.
*/
@Observer
@Component
export default class extends Vue {

    private todoStore = todoStore;
    private appVarStore = appVarStore;

    private valid = true;

    //ToDo의 title 입력에 대한 유효성검사 규칙
    //Validation rules for ToDo's title input.
    private titleRules = [
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ];

    /**
     * 사용자 입력을 검증한 후 todos로 저장하는 함수
     * 
     * A function that verifies user input and assigns it to todos.
    */
    save() : void {
        //사용자의 입력이 유효한지 확인
        //Check if user's input is valid
        const isValid = (this.$refs.form as any).validate();

        if (isValid) {
            //selectedTodoId 값이 0 이상이면 편집 모드
            //If the selectedToId value is 0 or more, it is editing.
            if (this.todoStore.selectedTodoId >= 0) {
                //전개 연산자(...)를 이용해 복사한 개채를 설정한다.
                //use the spread syntax. 
                //This prevents other components from changing the value of the todo without intention.
                this.todoStore.updateTodo({...this.todoStore.editTodo});
            }
            //selectedTodoId 값이 0보다 적으면 추가 모드
            //If the selectedToId value is less then 0, it is adding.
            else { 
                const newId = this.todoStore.todos[this.todoStore.todos.length-1].id + 1;
                this.todoStore.editTodo.id = newId;
                this.todoStore.editTodo.isDone = !!this.todoStore.editTodo.isDone;
                //전개 연산자(...)를 이용해 복사한 개채를 추가한다.
                //use the spread syntax. 
                //This prevents other components from changing the value of the todo without intention.
                this.todoStore.addTodo({...this.todoStore.editTodo});
                //방금 추가한 ToDo로 선택을 변경한다.
                //다른 컴포넌들의 selectedTodoId 값도 동시에 업데이트된다.
                //This causes that the value of selectedTodoId is shared.
                this.todoStore.setSelectedTodoId(newId);
            }

            console.log('save()', this.todoStore.todos, this.todoStore.editTodo);
        }
    }

    //본 컴포넌트를 화면에서 닫는다.
    //A function that closes this component form the screen
    close(): void {
        console.log('close()');
        this.appVarStore.showEdit = false;
    }

}
</script>
