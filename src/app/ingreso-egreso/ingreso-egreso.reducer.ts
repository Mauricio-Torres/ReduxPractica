import { AppState } from '../app.reducer';

import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';


export interface IngresoEgresoState {

  items: IngresoEgreso[];

}

export interface AppStateExtends extends AppState {
   ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
  items: null
};


export function ingresoEgresoReducer(state = estadoInicial, actions: fromIngresoEgreso.actions): IngresoEgresoState {


  switch (actions.type) {

    case fromIngresoEgreso.SET_ITEMS:
      return {
        items: [ ...actions.items.map( item =>  {
                     return { ...item };
            }) ]
      };

    case fromIngresoEgreso.UNSET_ITEMS:
      return {
        items: [ ]
      };

    default:
      return state;
  }
}
