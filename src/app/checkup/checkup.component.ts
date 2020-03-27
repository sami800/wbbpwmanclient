import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataupdateService } from '../dataservices/dataupdate.service';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.css']
})
export class CheckupComponent implements OnInit {

  loggedIn: boolean;

  checkupForm: FormGroup;

  anyResults: true;

  visibilityIcon = true;
  searchResults: any;

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private db: DataupdateService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit(): void {
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
    
    this.checkupForm = new FormGroup({
      password: new FormControl()
    });
    this.checkupForm.controls.password.setValue('');
  }

  checkup(checkupForm){
    this.db.syncData(checkupForm.value).subscribe(
      (res) => this.onSuccess(res),
      (error) => this.onErr(error)
    );
  }
  
  onSuccess(res) {
    console.log(localStorage.getItem('name') + " Logged in!");
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

}
