import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import { routing }        from './app.routing';

import { AlertComponent } from './directives/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './services/index';
import {TasksComponent} from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, routing],
  declarations: [AppComponent, TasksComponent, LoginComponent, RegisterComponent],
  providers: [AuthGuard, AlertService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
