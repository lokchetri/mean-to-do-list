import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TaskService, UserService} from '../../services/index';
import {Task} from '../../models/Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit{ 
    tasks: Task[];
    title: string;
    _id: string;
    isDone: boolean;
    showUpdateBtn = false;
    currentUser: any;

    ngOnInit() {    

    }
    constructor(private taskService:TaskService, 
    private userService:UserService){
        //Logged In User
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // Get All Tasks Saved By Logged In User
        this.getTasksByUserId(this.currentUser._id);
    }

    getTasksByUserId(userId){
        this.taskService.getTasksByUserId(userId)
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }

    // Save Task
    addTask(event){
        event.preventDefault();
        var newTask = {
            userId: this.currentUser._id,
            title: this.title,
            isDone: false
        }
        console.log('New Task', newTask);
        this.taskService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.title = '';
            });
    }

    // Edit Task
    editTask(id){
        var tasks = this.tasks;
        // Find out the edited task from tasks array
        for(var i = 0;i < tasks.length;i++){
            if(tasks[i]._id == id){
                console.log('Edit Task -',tasks[i]);
                //Set ng-model title
                this.title = tasks[i].title;
                this._id = tasks[i]._id;
                this.isDone = tasks[i].isDone;
            }
        }
        this.showUpdateBtn = true;
    }

    // Update Task
    updateTask(){
        var id = this._id;
        console.log('Update Task Id -',id);

        var _task = {
            _id:this._id,
            title: this.title,
            isDone: this.isDone,
            userId: this.currentUser._id
        };
        
        console.log('Updated Task -',_task);
        this.taskService.updateStatus(_task).subscribe(data => {
            console.log('Update Task Response -',data);
            //Update Tasks array/ Refresh Task List
            var tasks = this.tasks;
            for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                       tasks[i].title = this.title
                       //Clear input
                       this.title = '';
                       //Hide Update Btn
                       this.showUpdateBtn = false;
                    }
            }

        });
    }

    // Delete Task
    deleteTask(id){
        var tasks = this.tasks;
        
        this.taskService.deleteTask(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }
    
    // Update Status
    updateStatus(task){
        var _task = {
            _id:task._id,
            title: task.title,
            isDone: !task.isDone,
            userId: this.currentUser._id
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }
}
