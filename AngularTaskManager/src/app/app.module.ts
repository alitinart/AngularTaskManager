import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CreateTaskComponent,
    NewListComponent,
    NewTaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        redirectTo:'lists/6128a5387e965a4258623a67',
        pathMatch: 'full'
      },
      {
        path:'lists',
        redirectTo:'lists/6128a5387e965a4258623a67',
        pathMatch: 'full'
      },
      {
        path:'createTask',
        component:CreateTaskComponent
      },
      {
        path:'new-list',
        component:NewListComponent
      },
      {
        path:'lists/:listId',
        component:TasksComponent
      },
      {
        path:'lists/:listId/new-task',
        component:NewTaskComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
