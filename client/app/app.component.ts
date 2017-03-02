import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {TaskService, UserService, AlertService} from './services/index';
import {AlertComponent} from './directives/alert.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService, AlertComponent, UserService]
})

export class AppComponent implements OnInit {
  auth = false; 
  constructor(private userService : UserService, private router: Router){}
  ngOnInit() {    
      
  }
}
