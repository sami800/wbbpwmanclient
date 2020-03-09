import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './usermodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.userSubject.asObservable();
  }

    public get currentUserVal(): User {
        return this.userSubject.value;
    }

    login(uname: string, pword: string) {
      let postData = { email : uname, password : pword };
          return this.http.post('https://wbbpasswordmanager.appspot.com/auth/login', { "email" : uname , "password" : pword }, httpOptions ).pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    //this.userSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
      let postData = { "email" : localStorage.getItem('currentUser')};
      return this.http.post(`https://wbbpasswordmanager.appspot.com/auth/login`, postData, httpOptions).pipe(map(user => {
        if (user) {
            localStorage.removeItem('currentUser');
            this.userSubject.next(null);    
        } else {
          alert('Could not log out' + localStorage.getItem('currentUser') + 'Client offline');
        }
      }));
    }
}