import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
    //{ path: 'home', component: TasksComponent, canActivate: [AuthGuard] },
    { path: '', component: LoginComponent},
    { path: 'home', component: TasksComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);