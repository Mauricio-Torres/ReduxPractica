import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  formGroup: FormGroup;
  tipo = 'ingreso';
  cargando = true;
  loadingSuscription: Subscription = new Subscription();


  constructor(private formBuilder: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSuscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );

    this.formGroup = this.formBuilder.group({
      monto: [0, Validators.min(1)],
      description: ['', Validators.required],
    });
  }

  changeState(){
    if (this.tipo === 'ingreso')
    {
      this.tipo = 'egreso';
    } else {
      this.tipo = 'ingreso';
    }
  }
  crearIngresos() {

    if (this.formGroup.valid) {



      this.store.dispatch( new ActivarLoadingAction() );

      const ingresoEgreso = new IngresoEgreso ({...this.formGroup.value, tipo: this.tipo});
      console.log(ingresoEgreso)
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {

        this.formGroup.reset({ monto: 0 });
        this.store.dispatch( new DesactivarLoadingAction());

        Swal.fire({
          title: 'Registro exitoso!',
          text: 'El registro fue exitoso',
          icon: 'success',
          confirmButtonText: 'Ok!'
        });

      })
      .catch( err => {

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok!'
        });
      });

    }
  }

  ngOnDestroy(): void {
    this.loadingSuscription.unsubscribe();
  }
}
