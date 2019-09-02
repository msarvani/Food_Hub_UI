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
import {AlertComponent} from './_components';
import {fakeBackendProvider} from './_helpers';
import {JwtInterceptor} from './_helpers';
import {ErrorInterceptor} from './_helpers';
import {FontAwesomeModule} from 'ngx-icons';
import {MatIconRegistry, MatIconModule} from '@angular/material';
//import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
//import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';


/*let config = new AuthServiceConfig(
  [
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("910136718634-adb76dafu79r5vv7bt1lnrindh524jf2.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("2379121702157314")
    }
  ]);


export function provideConfig(){
  return config;
}*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    FontAwesomeModule,
    MatIconModule
   // SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   // {provide: AuthServiceConfig},
      fakeBackendProvider,
     // FacebookLoginProvider,
     // GoogleLoginProvider,
     //useFactory: provideConfig
    ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(matIconRegistry: MatIconRegistry){
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
};
