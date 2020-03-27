import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import Dexie from 'dexie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataupdateService extends Dexie {

  APISERVER = "https://wbbpasswordmanager.appspot.com/";

   constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
     super('WBBPWManager');
   }

    syncData(password: string): Observable<any> {
      return this.httpClient.post<any>(`${this.APISERVER}checkpassword/`, password).pipe(
        tap((res:  any) => {
          if (res) {
            for (let item in res) {
              localStorage.setItem(item, res[item])
            }
          } 
        })
      );
    }

    checkPassword(password: string): Observable<any> {
      return this.httpClient.post<string>(`${this.APISERVER}checkpassword/`, password).pipe(
        tap((res:  any) => {
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
