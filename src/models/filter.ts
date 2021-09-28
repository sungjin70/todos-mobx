
import { observable } from 'mobx';

/**
 * Filter 형식 정의
 * 
 * Type definition of Filter
 */
export default class Filter {
  @observable search = '';

  @observable isBusiness = false;
  @observable isPrivate = false;

}
