import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrationdialog',
  templateUrl: './registrationdialog.component.html',
  styleUrls: ['./registrationdialog.component.css']
})
export class RegistrationdialogComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(public auth: AuthService, public router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
   this.registrationForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.registrationForm.controls.email.setValue('');
    this.registrationForm.controls.password.setValue('');
  }

  register(registrationForm){
    this.auth.register(registrationForm.value).subscribe(
      (res) => this.onSuccess(res),
      (error) => this.onErr(error)
    );
  }
  
  onSuccess(res) {
    this.auth.navigateToLink('/');
    console.log(localStorage.getItem('name') + " Registration Complete");
  }

  onErr(err) {
    this.openSnackBar( 'Registration Failed', 'OK');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }
}
