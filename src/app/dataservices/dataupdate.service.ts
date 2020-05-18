import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddPasswordModel } from '../models/addpasswordmodel';
import { AddPasswordReturn } from '../models/addpasswordreturn';
import { UpdatePasswordModel } from '../models/updatepasswordmodel';
import { UpdatePasswordReturn } from '../models/updatepasswordreturn';

@Injectable({
  providedIn: 'root'
})
export class DataupdateService {

  APISERVER = 'https://wbbpasswordmanager.appspot.com/';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  addPassword(password: AddPasswordModel): Observable<AddPasswordReturn> {
    return this.httpClient.post<AddPasswordReturn>(`${this.APISERVER}user/addpassword`, password).pipe(
      tap(async (res: AddPasswordReturn) => {
        if (res) {
        } 
      })
    );
  }

  getPasswords(uid: string): Observable<any> {
    console.log(JSON.stringify(uid))
    return this.httpClient.post<any>(`${this.APISERVER}user/getpasswords`, {uid: uid}).pipe(
      tap((res:  any) => {
        if (res) {
          this.openSnackBar('Downloaded ' + res.length +' passwords', 'ok')
        }
      })
    );
  }

  updatePassword(password: UpdatePasswordModel): Observable<UpdatePasswordReturn> {
    return this.httpClient.post<UpdatePasswordReturn>(`${this.APISERVER}user/updatepassword`, password).pipe(
      tap(async (res: UpdatePasswordReturn) => {
        if (res) {
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
