<template>
<v-container >
    <v-toolbar height="70px" flat dark color="secondary" >
      <v-toolbar-title>Search</v-toolbar-title>

      <v-text-field
          placeholder="title"
          hide-details
          light
          solo
          v-model="filter.search"
          class="ml-6" 
      ></v-text-field>
      <v-checkbox
          label="Private"
          hide-details
          class="ml-4"
          v-model="filter.isPrivate"
      ></v-checkbox>
      <v-checkbox
          label="Business"
          hide-details
          class="ml-2"
          v-model="filter.isBusiness"
      ></v-checkbox>
      <v-spacer></v-spacer>
      <v-btn @click="todoStore.setSelectedTodoId(-2)">
        Add Todo
      </v-btn>
    </v-toolbar>
</v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {todoStore} from '../models/todoList';
import { Observer } from "mobx-vue";

/**
 * to-do 검색 툴바 컴포넌트
 * 
 * A component that serve a search toolbar
*/
@Observer
@Component
export default class extends Vue {
  private todoStore = todoStore;
  private filter = todoStore.filter;
}
</script>

<style scoped>

/deep/ .v-text-field{
  width: 150px;
}

</style>