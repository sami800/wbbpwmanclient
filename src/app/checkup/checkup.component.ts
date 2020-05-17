import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDBserviceService } from '../dataservices/local-dbservice.service';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.css']
})
export class CheckupComponent implements OnInit {

  loggedIn: boolean;

  checkupForm: FormGroup;

  anyResults: true;

  visibilityIcon = false;
  searchResults: any;

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private dbservice: LocalDBserviceService) {
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
    this.anyResults = true
    this.searchResults = this.dbservice.checkPassword(checkupForm.get('password').value)
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

}
