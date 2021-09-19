import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  status = 'Tasks'
  lists: any;
  tasks: any;
   
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get all tasks and display
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.taskService.getTasks(params.listId).subscribe((tasks:any) => {
        this.tasks = tasks;
      })
    })

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  onTaskClick(task:Task){
    // Set task to completed
    this.taskService.complete(task).subscribe(() => {
      console.log('completed sucessfuly')
      // Set completed Class
      task.completed = !task.completed;
    })
  }
  
  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe(() => {
      task.deleted = !task.deleted;
      console.log('Task Deleted Succesfully')
    })
  }
}
