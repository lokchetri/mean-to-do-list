import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) {
        console.log('User Service Initialized...');
     }

    getAll(){
        return this.http.get('/user/users')
            .map(res => res.json());
    }

    getById(id){
        return this.http.get('/user/user/'+id)
            .map(res => res.json());
    }
    getByUsername(username){
        return this.http.get('/user/user/'+username)
            .map(res => res.json());
    }
    
    create(user){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/user/user', JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    }
    update(user: User){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/user/user/'+user._id, JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    }
    delete(id){
        return this.http.delete('/user/user/'+id)
            .map(res => res.json());
    }
    
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}