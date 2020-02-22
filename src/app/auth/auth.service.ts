import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';


import '@firebase/database';
import '@firebase/firestore';
import '@firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';


import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';
import { User } from '../models/user.model';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userSuscription: Subscription = new Subscription();

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AppState>,
              private firestore: AngularFirestore) { }




  crearUsuario(nombre: any, email: any, password: any) {

    this.store.dispatch(new ActivarLoadingAction());

    this.firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(value => {


      const user = {
        uid: value.user.uid,
        nombre,
        email: value.user.email
      };

      this.firestore.doc(`${ user.uid }/usuario` ).set(user).then( () => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      });

    })
    .catch(err => {

      this.store.dispatch(new DesactivarLoadingAction());

      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Ok!'
      });
    });
  }


  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(err => {

        this.store.dispatch(new DesactivarLoadingAction());

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok!'
        });

      });
  }

  logout() {
    this.userSuscription.unsubscribe();
    this.firebaseAuth.signOut();
    this.router.navigate(['/login']);

  }

  initAuthListiner() {
    this.firebaseAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userSuscription = this.firestore.doc(`${ user.uid }/usuario` ).valueChanges().subscribe(
          (userObjMod: any) => {
            this.store.dispatch( new SetUserAction(new User(userObjMod)));
          }
        );
      } else {
        this.userSuscription.unsubscribe();
      }
    });
  }

  isAuth() {
    return this.firebaseAuth.authState.pipe( map( user => {

      if (user === null) {
        this.router.navigate(['/login']);
      }

      return user != null;
    }
    ));
  }

}
