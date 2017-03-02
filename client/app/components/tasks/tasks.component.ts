import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent { 
    tasks: Task[];
    title: string;
    _id: string;
    isDone: boolean;
    showUpdateBtn = false;

    constructor(private taskService:TaskService){
        //Get All Tasks
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }
    
    addTask(event){
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        }
        
        this.taskService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.title = '';
            });
    }

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
    
    updateTask(){
        var id = this._id;
        console.log('Update Task Id -',id);

        var _task = {
            _id:this._id,
            title: this.title,
            isDone: this.isDone
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
    
    updateStatus(task){
        var _task = {
            _id:task._id,
            title: task.title,
            isDone: !task.isDone
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }
}
