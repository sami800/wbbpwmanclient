import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  loggedIn: boolean;

  loginForm: FormGroup;

  visibilityIcon = true;


  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit(): void {
    if (this.loggedIn) {
      this.router.navigate(['/home'])
    }
    
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
