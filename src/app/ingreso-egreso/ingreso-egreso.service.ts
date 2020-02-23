import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnSetItemsAction } from './ingreso-egreso.actions';
import { SetUserAction } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// {...ingresoEgreso} operador spread

export class IngresoEgresoService {

  ingresoEgresoSuscriptionsInit: Subscription = new Subscription();
  ingresoEgresoSuscriptionsData: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, private authServis: AuthService, private store: Store<AppState> ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    return this.afDB.doc(`${ this.authServis.getUsuario().uid }/ingresos-egresos`)
    .collection('items').add({...ingresoEgreso});
  }

  initialIngresoEgreso() {
    this.ingresoEgresoSuscriptionsInit = this.store.select('auth')
                  .pipe( filter( auth => auth.user !== null ) )
                  .subscribe( auth => { this.ingresoEgresoItems( auth.user.uid ) });
  }

  private ingresoEgresoItems( uid: any ) {

    this.ingresoEgresoSuscriptionsData = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
             .snapshotChanges()
             .pipe( map( data => {
               return data.map( (dat: any) => {
                 return { uid: dat.payload.doc.id,
                          ...dat.payload.doc.data()
                };
              });

            }))
             .subscribe( (datos: any) => { this.store.dispatch( new SetItemsAction(datos) ); });
  }

  cancelarSuscriptions() {
    this.ingresoEgresoSuscriptionsInit.unsubscribe();
    this.ingresoEgresoSuscriptionsData.unsubscribe();
    this.store.dispatch(new UnSetItemsAction());
  }

  borrarIngresoEgreso(uid: any) {
    return this.afDB.doc(`${ this.authServis.getUsuario().uid }/ingresos-egresos/items/${ uid }`).delete();
  }

}
