import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private services: ServicesComponent
  ) {
    this.userName = '';
    this.password = '';
  }

  ngOnInit() {
  }

  login() {

    const conditionals = [
      this.userName === '',
      this.password === ''
    ];

    if (conditionals.includes(true)) {
      this.openSnackbar('Invalid credentials!');
      return false;
    }

    this.services.authenticate(this.userName, this.password).subscribe((ret: any) => {

      console.log(ret);
      if(ret) {

        localStorage.setItem('userName', this.userName);
        localStorage.setItem('token', ret.token);
        this.router.navigateByUrl('/tasks');        
        
      } else {

        this.openSnackbar('Server error!');
        
      }

    }, (error) => {
      
      this.openSnackbar('An error occurred, please try again in a few seconds! ' + error );
      
    });
    
  }

  openSnackbar(mensagem: string) {
    this.snackbar.open(mensagem, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
