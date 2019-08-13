import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {first} from 'rxjs/operators';


import {AuthenticationService} from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: String;
    success: String;

    constructor(
        //All these dependencies are injected using angular DI
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    )
    {
        //checks if the user is already loggedIn. If the user is loggedIn it redirects to home page
        if(this.authenticationService.currentUserValue){
            this.router.navigate(['/']);
        }
    }

    ngOnInit(){
        this.loginForm = this.formBuilder.group({
            username: ['',Validators.required],
            password: ['',Validators.required]
        });
//helps to redirect the user back to original page they requested before login
        this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'/';

         // show success message on registration
         if (this.route.snapshot.queryParams['registered']) {
            this.success = 'Registration successful';
        }
    };

    //easy access to form fields
    get f(){
        return this.loginForm.controls;
    }

    ngOnSubmit(){
        this.submitted = true;

        // reset alerts on submit
        this.error = null;
        this.success = null;

        //stop here if form is invalid
        if(this.loginForm.invalid){
            return;
        }

        this.loading = true;

        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error =>{
                    this.error = error;
                    this.loading = false;
                });
        }
    }
