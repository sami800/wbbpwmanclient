import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrationdialog',
  templateUrl: './registrationdialog.component.html',
  styleUrls: ['./registrationdialog.component.css']
})
export class RegistrationdialogComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {
   this.registrationForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.registrationForm.controls.email.setValue('');
    this.registrationForm.controls.password.setValue('');
  }

  register(registrationForm){
    this.auth.register(registrationForm.value).subscribe((res)=>{
      console.log("Registration Complete!");
      this.router.navigateByUrl('home');
    });    
  }
}
