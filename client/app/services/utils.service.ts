import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsService{
    constructor(){
        console.log('Utils Service Initialized...');
    }
    encode(input){
        return btoa(input);
    }
    decode(input){
        return atob(input);
    }
}