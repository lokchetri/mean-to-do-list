import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private userService: UserService,
        private router: Router,
        ) { }
 
    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.userService.getByUsername(this.model.username)
            .subscribe(
                data => {
                    console.log("Login Response -",data);
                    //compare password and redirect
                    //@Todo
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    //this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}