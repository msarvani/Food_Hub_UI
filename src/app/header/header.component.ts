import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls:['header.component.scss']
})
export class HeaderComponent implements OnInit{

    searchText;

    constructor(
        private router:Router
    ){
        
    }

    ngOnInit(){

    }

    logIn(){
        this.router.navigate(['/login']);
    }

    help(){
        this.router.navigate(['/help']);
    }
}