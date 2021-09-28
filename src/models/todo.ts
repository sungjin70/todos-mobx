import { observable } from 'mobx';

/**
 * Todo 형식 정의
 * 
 * Type definition of Todo
 */
export default class Todo {
    id = 0;
    @observable title = '';
    @observable isDone = false;
    @observable isBusiness?: boolean;
    @observable isPrivate?: boolean;
}