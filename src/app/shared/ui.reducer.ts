import * as fromUI from './ui.actions';






export interface State {

  isLoading: boolean;

}


const estadoInicial: State = {
  isLoading: false
}

export function uiReducer( state = estadoInicial, actions: fromUI.actions ): State {

  switch (actions.type) {
    case fromUI.ACTIVAR_LOADING:
      return { isLoading: true }

    case fromUI.DESACTIVAR_LOADING:
      return { isLoading: false }

    default:
      return state;
  }

}
