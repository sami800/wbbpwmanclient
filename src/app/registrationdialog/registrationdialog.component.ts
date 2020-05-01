import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrationdialog',
  templateUrl: './registrationdialog.component.html',
  styleUrls: ['./registrationdialog.component.css']
})
export class RegistrationdialogComponent implements OnInit {

  registrationForm: FormGroup;
  loggedIn: boolean;
  visibilityIcon: boolean = false;
  warningMessage:boolean;

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit(): void {
    if (this.loggedIn) {
      this.router.navigate(['/home'])
    }

    this.registrationForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
      name: new FormControl('')
    });
  }

  register(registrationForm){
    this.auth.register(registrationForm.value).subscribe(
      (res) => this.onSuccess(res),
      (error) => this.onErr(error)
    );
  }
  
  onSuccess(res) {
    this.openSnackBar( JSON.stringify(res), 'OK');
    this.auth.navigateToLink('/');
  }

  onErr(err) {
    this.openSnackBar( 'Registration Failed', 'OK');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

  passStrength(pw) {
    let score = 0;
    
    if (!pw) {
      return score;
    }
    
    let letters = new Object();
      
    for (let i=0; i<pw.length; i++) {
        letters[pw[i]] = (letters[pw[i]] || 0) + 1;
        score += 5.0 / letters[pw[i]];
    }

    let variations = {
        digits: /\d/.test(pw),
        lower: /[a-z]/.test(pw),
        upper: /[A-Z]/.test(pw),
        special: /!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(pw),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return score;
  }
}
