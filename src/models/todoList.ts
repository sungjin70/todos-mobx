import { filterTodos } from '@/utils/common-functions';
import { action,computed,observable } from 'mobx';
import Filter from './filter';
import Todo from './todo';
import {appVarStore} from './appFlow';

/**
 * TodoList 형식 정의
 * 
 * Type definition of Todo
 */
export class TodoList {

    private readonly appVarStore = appVarStore;

    @observable todos:Todo[] = [];
    @observable selectedTodoId = -1;

    @action setSelectedTodoId(todoId:number) {
        console.log('setSelectedTodoId()', todoId);

        this.selectedTodoId = todoId;

        if (todoId >= 0 || todoId == -2) {
            this.appVarStore.showEdit = true;
            this.makeEditTodo(todoId);
        }
    }

    @observable filter: Filter = new Filter();

    @observable editTodo:Todo = new Todo();    

    @computed get filteredTodos() {
        return filterTodos(this.todos, this.filter);
    }    

    @computed get undoneTodos() {
        return filterTodos(this.todos.filter(todo => !todo.isDone), this.filter);
    }

    @computed get doneTodos() {
        return filterTodos(this.todos.filter(todo => todo.isDone), this.filter);
    }

    @action addTodo(todo:Todo) {
        this.todos.push(todo);
    }

    @action updateTodo(todo:Todo) {
        const todoId = this.todos.findIndex(t => t.id === todo.id);
        if (todoId == -1) {
            console.warn('Wrong todo ID:', todo.id);
            return;
        }
            
        this.todos[todoId] = todo;
        this.todos = [...this.todos];
    }

    @action makeEditTodo(todoId:number) {
        const idx = this.todos.findIndex(t => t.id === todoId);

        let todo = null;
        if (idx != -1)
            todo = {...this.todos[idx]};
        else
            todo = {};

        this.editTodo = todo as Todo;
    }
}

export const todoStore = new TodoList();