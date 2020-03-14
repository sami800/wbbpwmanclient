import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserLogin } from '../userloginmodel';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  usertolog = new UserLogin();


  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.usertolog = new UserLogin();
  }

  adduser() {
    this.auth.login (this.usertolog).subscribe( (data) => {
     console.log(data.email);
    });
  }
}
