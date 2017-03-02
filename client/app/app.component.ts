import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import {AlertComponent} from './directives/alert.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService, AlertComponent]
})

export class AppComponent { }
