import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';




@NgModule ({

  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    FormsModule,
    AngularFireAuthModule,
    CommonModule,
    RouterModule
  ]
})

export class AuthModule {}
