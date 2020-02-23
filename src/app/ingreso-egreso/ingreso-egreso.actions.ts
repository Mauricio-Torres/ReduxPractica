import { Action } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';



export const SET_ITEMS = '[Ingresos Egresos] Set Items';
export const UNSET_ITEMS = '[Ingresos Egresos Delete] UnSet Items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;
  constructor(public items: IngresoEgreso[]) {}
}

export class UnSetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
  constructor() {}
}

export type actions = SetItemsAction | UnSetItemsAction;
