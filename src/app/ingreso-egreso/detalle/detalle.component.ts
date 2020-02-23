import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription()
  items: IngresoEgreso[];

  constructor( private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {

    this.subscription = this.store.select('ingresoEgreso')
              .subscribe( ingresoEgreso => {
                this.items = ingresoEgreso.items;
              });
  }

  borrarItem(item: any) {

    const uid = item.uid;
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then( (data: any) => {

      Swal.fire({
        title: 'Registro Eliminado exitosamente!',
        text: 'El registro ' + item.description + ' con monto ' + item.monto  + ' fue eliminado exitosamente ',
        icon: 'success',
        confirmButtonText: 'Ok!'
      });

    } ).catch( err => {

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok!'
        });
      }
     )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
