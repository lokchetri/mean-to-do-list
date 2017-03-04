"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../../services/index');
var TasksComponent = (function () {
    function TasksComponent(taskService, userService) {
        this.taskService = taskService;
        this.userService = userService;
        this.showUpdateBtn = false;
        //Logged In User
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // Get All Tasks Saved By Logged In User
        this.getTasksByUserId(this.currentUser._id);
    }
    TasksComponent.prototype.ngOnInit = function () {
    };
    TasksComponent.prototype.getTasksByUserId = function (userId) {
        var _this = this;
        this.taskService.getTasksByUserId(userId)
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    // Save Task
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            userId: this.currentUser._id,
            title: this.title,
            isDone: false
        };
        console.log('New Task', newTask);
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
        });
    };
    // Edit Task
    TasksComponent.prototype.editTask = function (id) {
        var tasks = this.tasks;
        // Find out the edited task from tasks array
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i]._id == id) {
                console.log('Edit Task -', tasks[i]);
                //Set ng-model title
                this.title = tasks[i].title;
                this._id = tasks[i]._id;
                this.isDone = tasks[i].isDone;
            }
        }
        this.showUpdateBtn = true;
    };
    // Update Task
    TasksComponent.prototype.updateTask = function () {
        var _this = this;
        var id = this._id;
        console.log('Update Task Id -', id);
        var _task = {
            _id: this._id,
            title: this.title,
            isDone: this.isDone,
            userId: this.currentUser._id
        };
        console.log('Updated Task -', _task);
        this.taskService.updateStatus(_task).subscribe(function (data) {
            console.log('Update Task Response -', data);
            //Update Tasks array/ Refresh Task List
            var tasks = _this.tasks;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i]._id == id) {
                    tasks[i].title = _this.title;
                    //Clear input
                    _this.title = '';
                    //Hide Update Btn
                    _this.showUpdateBtn = false;
                }
            }
        });
    };
    // Delete Task
    TasksComponent.prototype.deleteTask = function (id) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    // Update Status
    TasksComponent.prototype.updateStatus = function (task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone,
            userId: this.currentUser._id
        };
        this.taskService.updateStatus(_task).subscribe(function (data) {
            task.isDone = !task.isDone;
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tasks',
            templateUrl: 'tasks.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.TaskService, index_1.UserService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map