<template>
<div>
  <to-do-filter />
  <v-sheet
    class="fill-height overflow-hidden"
    style="position: relative;"
  >
  <v-container class="fill-height">
    <v-row class="mb-6">
      <v-col >
        <v-card class="elevation-12">
          <ToDoList :done="false" />
        </v-card>
      </v-col>
      <v-col >
        <v-card class="elevation-12">
          <ToDoList :done="true" />
        </v-card>
      </v-col>
      <v-col md="auto">
        <v-navigation-drawer
          v-model="appVarStore.showEdit"
          :permanent="appVarStore.showEdit"
          right
        >
          <ToDoDetail  />
          <v-divider></v-divider>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>

  </v-sheet>

  <!-- <v-btn @click="setTodosWithDefault()">setTodosWithDefault</v-btn>
  <br />
  {{todos}} -->

</div>
  
 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoList from '../components/ToDoList.vue';
import ToDoFilter from '../components/ToDoFilter.vue';
import ToDoDetail from '../components/ToDoDetail.vue';
import {todoStore} from '../models/todoList';
import {appVarStore} from '../models/appFlow';
import { Observer } from "mobx-vue";

/**
 * to-do 페이지 컴포넌트.
 * 
 * A component that allows users to manage their to-do lists, which serve as a page.
*/
@Observer
@Component({
  components: {
    ToDoList,
    ToDoFilter,
    ToDoDetail
  },
})
export default class extends Vue {

  private appVarStore = appVarStore; 

  private todoStore = todoStore;

  created(): void {

    if (this.todoStore.todos?.length === 0)
      this.setTodosWithDefault();  
  }

  /**
   * todos속성 배열에 기본 샘플 값을 설정함.
   * 
   * Sets the example value in the todos property array.
  */
  setTodosWithDefault() : void {
    this.todoStore.todos = [
      {
        id:1,
        title:'Todo 1',
        isDone:false,
        isPrivate:true
      },
      {
        id:2,
        title:'Todo 2',
        isDone:true
      },
      {
        id:3,
        title:'Todo 3',
        isDone:false,
        isBusiness:true
      },
      {
        id:4,
        title:'Todo 4',
        isDone:true,
        isBusiness:true,
        isPrivate:true,
      }
    ];

    console.log('setTodosWithDefault()', this.todoStore.todos);
  }
}
</script>
