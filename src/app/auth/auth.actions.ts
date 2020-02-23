import { Action } from '@ngrx/store';
import { User } from '../models/user.model';



export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth Delete] Delet User';

export class SetUserAction implements Action {

  readonly type = SET_USER;

  constructor(public user: User) {}
}
export class UnSetUserAction implements Action {

  readonly type = UNSET_USER;

  constructor() {}
}

export type actions = SetUserAction | UnSetUserAction;
