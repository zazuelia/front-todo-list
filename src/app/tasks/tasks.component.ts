import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesComponent } from '../services/services.component';
import { Tasks } from './local-interfaces/tasks-interface';
import { Router } from '@angular/router';
import { User } from '../global/user-interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasksChecked: Tasks[];
  tasksUnchecked: Tasks[];
  userName: any;
  newTask = '';

  constructor(
    private services: ServicesComponent,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.tasksChecked = [];
    this.tasksUnchecked = [];
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.getTasks();
    console.log(localStorage.getItem('userName'));
  }

  getTasks() {

    this.services.getTasksByUserName(this.userName).subscribe((ret: any) => {

      if (ret) {

        console.log(ret);
        this.tasksChecked = ret.filter((ret: any) => { if (ret.checked) return ret });
        console.log(this.tasksChecked);
        this.tasksUnchecked = ret.filter((ret: any) => { if (!ret.checked) return ret });
        console.log(this.tasksUnchecked);

      }

    }, (error) => {

      console.log(error.error.error_message);
      this.openSnackbar('An error occurred, please reload the page! ' + error.error.error_message);

    });
  }

  logout() {
    localStorage.setItem('userName', '');
    this.router.navigateByUrl('/');
  }

  openSnackbar(mensagem: string) {
    this.snackbar.open(mensagem, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  //TEST ONLY
  removeTaskC(i: number) {

    this.tasksChecked.splice(i, 1);
  }

  //TEST ONLY
  removeTask(task: Tasks) {

    this.services.deleteTask(task.taskId as number).subscribe(ret => {

      if(!task.checked)
        this.tasksUnchecked.splice(this.tasksUnchecked.indexOf(task), 1);
      else
        this.tasksChecked.splice(this.tasksChecked.indexOf(task), 1);
      
      this.openSnackbar('Task deleted');
    }, (error) => {

      console.log(error);
      alert(error);
    }, () => {

    });

  }

  //TEST ONLY
  checkTask(i: number, isChecked: boolean) {


    if (isChecked) {
      this.tasksChecked.push(this.tasksUnchecked[i]);
      this.tasksUnchecked.splice(i, 1); 

      let user = {
        user: {
          userId: 1,
          userName: 'jelia',
          tasks: []
        }
      };
      let objTask: Tasks = Object.assign(user, [...this.tasksChecked].pop());
      
      console.log(objTask);
      this.services.saveTask(objTask).subscribe(ret => {

      });
    } else {
      this.tasksUnchecked.push(this.tasksChecked[i]);
      this.tasksChecked.splice(i, 1);

      let user = {
        user: {
          userId: 1,
          userName: 'jelia',
          tasks: []
        }
      };
      let objTask: Tasks = Object.assign(user, [...this.tasksUnchecked].pop());
      console.log(objTask);

      this.services.saveTask(objTask).subscribe(ret => {

      });
    }    

  }

  addTask() {

    let objTask: Tasks = {
      checked: false,
      taskName: this.newTask
    };

    this.services.saveTask(objTask).subscribe(ret => {

      this.tasksUnchecked.push(ret);
      this.openSnackbar('Task added');
      this.newTask = '';
    }, (error) => {

      alert(error);
    }, () => {

    });
  }

}
