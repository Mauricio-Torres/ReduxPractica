import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,  private store: Store<AppState>) { }

  cargando: boolean;
  suscription: Subscription;

  ngOnInit() {

    this.suscription = this.store.select('ui').subscribe( ui => { this.cargando = ui.isLoading; })

  }

  onSubmit(formulario: any){

    this.authService.login(formulario.email, formulario.password);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
