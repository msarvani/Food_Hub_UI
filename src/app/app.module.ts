import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { appRoutingModule } from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {AvatarModule} from 'ngx-avatar';

import {fakeBackendProvider} from './_helpers';
import {JwtInterceptor} from './_helpers';
import {ErrorInterceptor} from './_helpers';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
