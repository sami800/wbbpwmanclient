import { Injectable, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from './usermodel';
import { UserToken } from './usermodeltoken';

import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AfterViewChecked {

  APISERVER = "https://wbbpasswordmanager.appspot.com/";

  authSubject  =  new  BehaviorSubject(false);

   constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
     if (localStorage.getItem('access_token') != null && new Date() <= new Date(localStorage.getItem('expires_at')) ) {
      this.authSubject.next(true);
     } else {
      this.authSubject.next(false);
      this.navigateToLink('/');
      }
    }

    ngAfterViewChecked(): void {
      if (this.isAuthenticated) {
        this.navigateToLink('/');
      }
    }

    register(user: User): Observable<UserToken> {
      return this.httpClient.post<UserToken>(`${this.APISERVER}auth/register`, user).pipe(
        tap((res:  UserToken) => {
          if (res) {
            for (let item in res) {
              localStorage.setItem(item, res[item])
            }
            this.openSnackBar( res.name +' Registration complete', 'OK');
            this.authSubject.next(true);
          } 
        })
      );
    }

    signIn(user: User): Observable<UserToken> {
      console.log(user);
      return this.httpClient.post<UserToken>(`${this.APISERVER}auth/login`, user).pipe(
        tap(async (res: UserToken) => {
          if (res.success) {
            for (let item in res) {
              localStorage.setItem(item, res[item])
            }
            this.openSnackBar( res.name +' signed in', 'OK');
            history.pushState(null, null, '/home');
            this.authSubject.next(true);
          } 
        })
      );
    }

    signOut(): Observable<any> {
      let username = localStorage.getItem('name');
      this.openSnackBar( username +' signed out', 'OK');
      this.authSubject.next(false);
      localStorage.clear();
      this.navigateToLink('/');
      return this.httpClient.get(`${this.APISERVER}auth/logout`, { observe: 'response', headers:{ 'access_token': JSON.stringify(localStorage.getItem('access_token'))}}).pipe(
        tap(async (res: any) => {
          if (res) {
            for (let item in res) {
              console.log(item);
            }
            this.openSnackBar( username +' signed out', 'OK');
            this.authSubject.next(false);
            history.pushState(null, null, '/');
            this.navigateToLink('/');
          }
        })
      );
    }

    isAuthenticated() {
      return  this.authSubject.asObservable();
    }

    navigateToLink(url: string) {
      this.router.navigateByUrl(url);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
    }

}
