import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/usermodel';
import { NewUser } from '../models/newusermodel';
import { UserToken } from '../models/usermodeltoken';
import { UserResult } from '../models/newuserresult';


import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  APISERVER = "https://wbbpasswordmanager.appspot.com/";

  authSubject  =  new  BehaviorSubject(false);

   constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
     if (localStorage.getItem('access_token') != null && new Date() <= new Date(localStorage.getItem('expires_at')) ) {
      this.authSubject.next(true);
     } else {
      this.authSubject.next(false);
      }
    }

    register(user: NewUser): Observable<UserResult> {
      console.table(user);
      return this.httpClient.post<UserResult>(`${this.APISERVER}auth/signup`, user).pipe(
        tap((res:  UserResult) => {
          if (res) {
            console.table(res);
            for (let item in res) {
              localStorage.setItem(item, res[item])
            }
          } 
        })
      );
    }

    signIn(user: User): Observable<UserToken> {
      console.log(user);
      return this.httpClient.post<UserToken>(`${this.APISERVER}auth/login`, user).pipe(
        tap(async (res: UserToken) => {
          if (res) {
            console.table(res);
            for (let item in res) {
              localStorage.setItem(item, res[item])
            }
            this.authSubject.next(true);
          } 
        })
      );
    }

    signOut(): Observable<any> {
      let username = localStorage.getItem('name');
      this.navigateToLink('/login');
      return this.httpClient.post(`${this.APISERVER}auth/logout`, { observe: 'response', headers:{ 'access_token': JSON.stringify(localStorage.getItem('access_token'))}}).pipe(
        tap(async (res: any) => {
          if (res) {
            console.table(res);
            for (let item in res) {
              console.log(item);
            }
            this.openSnackBar( username +' signed out', 'OK');
            this.authSubject.next(false)
            localStorage.clear();
            this.navigateToLink('/login');
          }
        })
      );
    }

    isAuthenticated() {
      return this.authSubject.asObservable();
    }

    navigateToLink(url: string) {
      this.router.navigateByUrl(url);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
    }

}
