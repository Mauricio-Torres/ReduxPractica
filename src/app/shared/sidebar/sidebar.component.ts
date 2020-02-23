import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy  {

  nombre = '';
  subscription: Subscription = new Subscription();

  constructor( public authService: AuthService,
               private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
                                  .pipe( filter( auth => auth.user != null ))
                                  .subscribe(auth => this.nombre = auth.user.nombre);

  }

  logOuth() {
    this.ingresoEgresoService.cancelarSuscriptions();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
