import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LocalDBserviceService } from '../dataservices/local-dbservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataupdateService } from '../dataservices/dataupdate.service';
import { PasswordRecord } from '../models/password-record';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit, AfterViewInit {

  loggedIn: boolean;

  buttonPassword: any;

  visibilityIcon = false;

  searchResults = [];

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private dbservice: LocalDBserviceService, private udservice: DataupdateService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
    })
    this.searchResults = dbservice.getAllPasswords()
  }
  ngAfterViewInit(): void {
    if (this.searchResults.length === 0) {
      this.udservice.getPasswords(localStorage.getItem('id')).subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onErr(error)
      );
    }
    if (this.searchResults.length > 0) {
      this.udservice.getPasswords(localStorage.getItem('id')).subscribe(
      );
    }
  }

  ngOnInit() { 
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
  }

  onSuccess(res) {

    let dlPasswordArray: PasswordRecord;

    dlPasswordArray
    
    for (let item in res) {
        dlPasswordArray = ({id: res[item].id, site: res[item].site , password: res[item].passwordhash, updatedate: res[item].updated_at});
        this.dbservice.addPassword(dlPasswordArray)
        this.searchResults = this.dbservice.getAllPasswords()
    }
    setTimeout(() => { this.ngOnInit(); }, 1000);
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }
}
