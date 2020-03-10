import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  username;
  password;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
  
  login(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }
  

}
