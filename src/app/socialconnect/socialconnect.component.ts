import {Component, OnInit} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';

@Component({
    selector: 'social-connect',
    templateUrl: 'socialconnect.component.html',
    styleUrls: ['./socialconnect.component.scss']
})
export class SocialConnectComponent implements OnInit{

    private user: SocialUser;
  //private loggedIn: boolean;

    constructor (private authService: AuthService){}

    ngOnInit(){
        this.authService.authState.subscribe(
            (user) => {
                this.user = user;
                console.log(user);
                     });
   }
   
    signInWithGoogle():void{
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x=>console.log(x));
    }

    signInWithFB():void{
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x=>console.log(x));
    }
   
    signOut():void{
        this.authService.signOut();
    }   
}