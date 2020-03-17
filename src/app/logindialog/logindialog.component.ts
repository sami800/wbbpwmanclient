import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  
  loginForm: FormGroup;

  constructor(public auth: AuthService, public router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');
  }

  login(loginForm){
    this.auth.signIn(loginForm.value).subscribe(
      (res) => this.onSuccess(res),
      (error) => this.onErr(error)
    );
  }
  
  onSuccess(res) {
    this.auth.navigateToLink('/home');
    console.log(localStorage.getItem('name') + " Logged in!");
  }

  onErr(err) {
    this.openSnackBar( 'Login Failed', 'OK');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }
}
