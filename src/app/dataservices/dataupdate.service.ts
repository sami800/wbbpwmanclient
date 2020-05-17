import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AddPasswordModel } from '../models/addpasswordmodel';
import { AddPasswordReturn } from '../models/addpasswordreturn';
import { UpdatePasswordModel } from '../models/updatepasswordmodel';
import { UpdatePasswordReturn } from '../models/updatepasswordreturn';

@Injectable({
  providedIn: 'root'
})
export class DataupdateService {

  APISERVER = 'https://wbbpasswordmanager.appspot.com/';

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  addPassword(password: AddPasswordModel): Observable<AddPasswordReturn> {
    console.log(password);
    return this.httpClient.post<AddPasswordReturn>(`${this.APISERVER}user/addpassword`, password).pipe(
      tap(async (res: AddPasswordReturn) => {
        if (res) {
          console.table(res);
          for (let item in res) {
            localStorage.setItem(item, res[item])
          }
        } 
      })
    );
  }

/*   getPassword(password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APISERVER}user/getpasswords`, password).pipe(
      tap((res:  any) => {
        if (res) {
          for (let item in res) {
            localStorage.setItem(item, res[item])
          }
        }
      })
    );
  } */

  updatePassword(password: UpdatePasswordModel): Observable<UpdatePasswordReturn> {
    console.log(password);
    return this.httpClient.post<UpdatePasswordReturn>(`${this.APISERVER}user/updatepassword`, password).pipe(
      tap(async (res: UpdatePasswordReturn) => {
        if (res) {
          console.table(res);
          for (let item in res) {
            localStorage.setItem(item, res[item])
          }
        } 
      })
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

}
