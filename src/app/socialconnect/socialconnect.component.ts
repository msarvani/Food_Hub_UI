import {Component, OnInit} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';

@Component({
    selector: 'social-connect',
    templateUrl: 'socialconnect.component.html',
    styleUrls: ['socialconnect.component.css']
})
export class SocialConnectComponent implements OnInit{

    private user: SocialUser;
  private loggedIn: boolean;

    constructor (private authService: AuthService){}
   
    signInWithGoogle():void{
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => {
                this.user = userData;
            });
    }

    signInWithFB():void{
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (userData) => {
                this.user = userData;
            });
    }
   
    signOut():void{
        this.authService.signOut();
    }
   
    ngOnInit(){
         this.authService.authState.subscribe(
             (user) => {
                 this.user = user;
                 this.loggedIn = (user != null);
             }
         );
    }
}