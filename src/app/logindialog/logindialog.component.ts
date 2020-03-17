import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {
   this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');
  }

  login(loginForm){
    this.auth.signIn(loginForm.value).subscribe((res)=>{
      console.log("Logged in!");
      this.router.navigateByUrl('home');
    });    
  }
}
