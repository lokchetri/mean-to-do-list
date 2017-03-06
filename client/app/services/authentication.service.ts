import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(userName: string, password: string) {
        console.log("userName, password", userName, password);
        return this.http.get('/user/user/name/'+userName)
            .map((res) => {
                console.log('Login Response', res.json());
                let user = res.json();
                if (user.password === password) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}