import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, pipe } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {


  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[0, 0]];
  public doughnutChartType: ChartType = 'doughnut';

  usuario: any;
  ingresos = 0;
  egresos = 0;
  cuantosIngresos = 0;
  cuantosEgresos = 0;

  subscriptionIngresoEgreso: Subscription = new Subscription();
  subscriptionUserAuth: Subscription = new Subscription();


  constructor( private state: Store<AppState> ) { }

  ngOnInit() {

    this.subscriptionIngresoEgreso = this.state.select('ingresoEgreso').subscribe( (data: any) => {
                                                this.contarIngresoEgreso(data.items); });
    this.subscriptionUserAuth = this.state.select('auth')
                                          .pipe( filter( auth => auth.user !== null ) )
                                          .subscribe( auth => {     console.log(auth);
                                                                    this.usuario = auth.user.nombre;
                                                    });

  }

  contarIngresoEgreso(datos: any[]) {

    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    if (datos && datos !== undefined && datos !== null)
    {
       datos.forEach( (item: any) => {

        if (item.tipo === 'ingreso') {

          this.ingresos = this.ingresos + item.monto;
          this.cuantosIngresos ++;
        } else if (item.tipo === 'egreso') {

          this.egresos = this.egresos + item.monto;
          this.cuantosEgresos ++;
        }
      });

       this.doughnutChartData = [ [this.ingresos, this.egresos ] ];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionIngresoEgreso.unsubscribe();
    this.subscriptionUserAuth.unsubscribe();
  }

  mostrarGrafica = () => { if (this.ingresos > 0 || this.egresos > 0) { return true; } return false;  };
}
