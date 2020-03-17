import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from './usermodel';
import { UserToken } from './usermodeltoken';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  APISERVER = "https://wbbpasswordmanager.appspot.com/";

  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

    register(user: User): Observable<UserToken> {
      return this.httpClient.post<UserToken>(`${this.APISERVER}auth/register`, user).pipe(
        tap((res:  UserToken ) => {
          if (res.user) {
            for (let item in res.user) {
              localStorage.setItem(item, res.user[item])
            }
            this.authSubject.next(true);
          }
        })
  
      );
    }

    signIn(user: User): Observable<UserToken> {
      this.authSubject.next(true);
      this.navigateToLink('/home');
      console.log(user);
      return this.httpClient.post(`${this.APISERVER}auth/login`, user).pipe(
        tap(async (res: UserToken) => {
          if (res.user) {
            for (let item in res.user) {
              localStorage.setItem(item, res.user[item])
            }
            this.authSubject.next(true);
          }
        })
      );
    }

    signOut(user: User): Observable<UserToken> {
      this.authSubject.next(false);
      this.navigateToLink('/');
      return this.httpClient.post(`${this.APISERVER}auth/logout`, user).pipe(
        tap(async (res: UserToken) => {
          if (res.user) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("EXPIRES_IN");
            this.authSubject.next(false);
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
}
