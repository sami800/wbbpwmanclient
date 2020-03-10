import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './usermodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*'
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
    localStorage.setItem('loginstatus', JSON.stringify('true'));
    localStorage.setItem('currentUser', JSON.stringify('testUser'));

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.userSubject.asObservable();
  }

    public get currentUserVal(): User {
        return this.userSubject.value;
    }

    public getUserInfo(): Observable<User> {
      return this.userSubject.asObservable();
    }



    login(uname: string, pword: string) {
      return this.http.post<any>('https://wbbpasswordmanager.appspot.com/auth/login', { email : uname , password : pword },
      httpOptions ).pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
      const postData = { email : localStorage.getItem('currentUser')};
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
