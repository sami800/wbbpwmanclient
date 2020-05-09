import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  searchResults: any;

  buttonPassword: any;

  visibilityIcon = false;


  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private localdb: LocalDBserviceService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
    })
  }

  ngOnInit() { 
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
    this.loadAllToGrid()
    this.buttonPassword = 'View Password'
  }

  loadAllToGrid() {
    this.searchResults = [this.localdb.getAllPasswords()]
  }

  onSuccess(res) {
    console.log(localStorage.getItem('name') + ' Logged in!');
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }
}
