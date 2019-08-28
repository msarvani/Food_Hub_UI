import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Router, NavigationStart } from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AlertService{
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router){
//clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(
            event => {
                if(event instanceof NavigationStart){
                    if(this.keepAfterRouteChange){
                        this.keepAfterRouteChange = false;
                    }else{
                        this.clear();
                    }

                }
            }
        );
}

getAlert():Observable<any>
{
    return this.subject.asObservable();
}

success(message: string, keepAfterRouteChange = false){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type:'success', text:message});
}

error(message: string, keepAfterRouteChange = false){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type:'error', text:message});
}

clear(){
    this.subject.next();
}
}