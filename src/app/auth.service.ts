import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './usermodel';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers: HttpHeaders;
  public userinf: BehaviorSubject<User> = new BehaviorSubject<User>({
    id : 0,
        loginstatus: false,
        username: 'temp',
        password: 'temp',
        firstName: 'temp',
        loginTime: '0',
  });

  constructor(private http: HttpClient, private router: Router) {

    this.userinf.subscribe(val => {
        for (let item in val) {
          localStorage.setItem(item, val[item])
        }
        console.log(val);
      });
    }

    login(uname: string, pword: string) {
      // will navigation to the IF below when access point is done.
      this.navigateToLink('/home');
      this.userinf.next({...this.userinf.value, loginstatus: true})
      return this.http.post<any>('https://wbbpasswordmanager.appspot.com/auth/login', { email : uname , password : pword },
      httpOptions ).pipe(map(user => {
        if (user && user.token) {
          for (let field in user) {
            localStorage.setItem(field , JSON.stringify(user[field]))
          }}
          return user;
      }))
    }

    logout() {
      // will move navigation to IF below when access point is done.
      this.navigateToLink('/');
      this.userinf.next({...this.userinf.value, loginstatus: false})
      const postData = { email : localStorage.getItem('username')};
      return this.http.post(`https://wbbpasswordmanager.appspot.com/auth/logout`, postData, httpOptions).pipe(map(user => {
        if (user) {
          for (let field in user) {
            localStorage.removeItem(field)
          }
        } else {
          alert('Could not log out ' + localStorage.getItem('username') + ' Client offline');
        }
      }));
    }
    navigateToLink(url: string) {
      this.router.navigateByUrl(url);
    }
}
