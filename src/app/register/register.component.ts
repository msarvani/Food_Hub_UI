import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {first} from 'rxjs/operators';


import {UserService, AuthenticationService} from '../_services';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit{

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: String;

    constructor(
        private formBuilder: FormBuilder,
       private router: Router,
       private authenticationService: AuthenticationService,
       private userService: UserService
    ){
       //need to login to home page if user is already logged in user
       if(authenticationService.currentUserValue){
           this.router.navigate(['/']);
       }
    }

    ngOnInit(){
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    //convenience getter for easy access to form fields
    get f(){
        return this.registerForm.controls;
    }

    onSubmit(){
        
        this.submitted = true;
        
        if(this.registerForm.invalid){
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/login'], {queryParams: { registered:true}});
                    },

                    error =>{
                        this.error = error;
                        this.loading = false;
                    }

                );
    }

}