import { Injectable } from '@angular/core';
import { List } from './models/list.model';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title:string){
    // Send Req to create a list
    return this.webReqService.post('lists',{ title });
    // Nav to /lists/respons._id
  }
  getLists(){
    // Send Req to create a list
    return this.webReqService.get('lists');
    // Nav to /lists/respons._id
  }
  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  createTask(title:string, listId: string){
    // Send Req to create a task
    return this.webReqService.post(`lists/${listId}/tasks`,{ title });
    // Nav to /lists/response._id/
  }
  // Complete Task

  complete(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }
  // Delete Task

  deleteTask(task:Task){
    return this.webReqService.delete(`lists/${task._listId}/tasks/${task._id}`)
  }
  
  // Edit List

  editList(title:string, list:List){
    return this.webReqService.patch(`lists/${list._id}`,{
      title: title
    })
  }
}
