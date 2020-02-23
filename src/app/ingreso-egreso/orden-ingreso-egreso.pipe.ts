import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

        if (items && items !== undefined ) {
          return items.sort( (a, b) => {

            if ( a.tipo === 'ingreso') {
              return -1;
            } else {
              return 1;
            }
          });
        } else {
          return [];
        }
  }

}
