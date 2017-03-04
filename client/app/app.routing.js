"use strict";
var router_1 = require('@angular/router');
var tasks_component_1 = require('./components/tasks/tasks.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var auth_guard_1 = require('./guards/auth.guard');
var appRoutes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'home', component: tasks_component_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map