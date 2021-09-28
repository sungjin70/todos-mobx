import { observable } from 'mobx';

/**
 * AppVar 정의
 * 
 * Type definition of Todo
 */
export class AppVar {
    @observable showEdit = false;
}

export const appVarStore = new AppVar();