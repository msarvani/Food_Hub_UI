import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {mergeMap, materialize, delay, dematerialize} from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';

//let users = [{id:1, firstName: 'Sarvani', lastName: 'Medarametla', userName: 'saruMeda', password: 'mydummypassword'}];

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        const {url, method, headers, body} = request;
    
//wrap in delayed observable to simulate server api call
return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute(){
        switch(true){
            case url.endsWith('/users/authenticate') && method == 'POST': return authenticate();
            case url.endsWith('/users/register') && method == 'POST': return register();
            default: next.handle(request);
        }
    }

    function authenticate(){
        const {username, password} = body;
        const user = users.find(x=> x.userName === username && x.password === password);
        if(!user)
            return error('username and password is incorrect');
        return ok({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            token: 'fake-jwt-token'
        })
    }

    function register(){
        const user = body;

        if(users.find(x => x.username === user.username)){
            return error('UserName' + user.userName + 'already exists');
        }

        user.id = users.length ? Math.max(...users.map(x => x.id))+1 : 1;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
    }

    function ok(body?){
        return of(new HttpResponse({status: 200, body}))

    }

    function error(message){
       return throwError({message: {message}});
    }

}
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};