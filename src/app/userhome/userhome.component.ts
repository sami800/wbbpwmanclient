import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LocalDBserviceService } from '../dataservices/local-dbservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  loggedIn: boolean;

  buttonPassword: any;

  visibilityIcon = false;

  searchResults = [];

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private dbservice: LocalDBserviceService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
    })
    this.searchResults = dbservice.getAllPasswords()
  }

  ngOnInit() { 
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
  }

  onSuccess(res) {
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }
}
