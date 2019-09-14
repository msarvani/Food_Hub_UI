import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/Router';
import { Router } from '@angular/router';

import {AuthenticationService} from '../_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authenticationService.currentUserValue;

        //authorized person
        if(currentUser){
            return true;
        }

        //not logged-in, so redirect to login page with the return url
       // this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        return false;
    }

}