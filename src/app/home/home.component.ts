import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../_services';
import {UserService} from '../_services';


import {first} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl:'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit{

    currentUser: any;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ){
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit(){
        //this.loadAllUsers();
    }

    deleteUser(id: number){
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());

    }

    private loadAllUsers(){
        this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
    }

}