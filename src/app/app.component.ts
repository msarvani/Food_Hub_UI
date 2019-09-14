import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x);
  }

  ngOnInit(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  }
