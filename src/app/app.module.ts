import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import {HeaderComponent} from './header';
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
import {GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {SocialConnectComponent} from './socialconnect';
import { HelpComponent } from './help';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

const config = new AuthServiceConfig(
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
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SocialConnectComponent,
    HeaderComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    FontAwesomeModule,
    MatIconModule,
    SocialLoginModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: AuthServiceConfig, useFactory: provideConfig},
      fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(matIconRegistry: MatIconRegistry){
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
};
