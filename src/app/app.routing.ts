import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {HelpComponent} from './help';
import {AuthGuard} from './_helpers';
import { SocialConnectComponent } from './socialconnect/socialconnect.component';

const appRoutes: Routes = [
    { path : '', component: HomeComponent, canActivate: [AuthGuard]},
    { path : 'home', component: HomeComponent},
    { path : 'login', component: LoginComponent},
    { path : 'register', component: RegisterComponent},
    {path : 'social', component: SocialConnectComponent},
    {path : 'help', component: HelpComponent},
    { path : '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(appRoutes);