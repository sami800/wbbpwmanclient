import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataupdateService } from '../dataservices/dataupdate.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  currentTab = new FormControl(0);
  tabPosition = 'below';
  loggedIn: boolean;
  generatePWForm: FormGroup;
  savePWForm: FormGroup;
  visibilityIcon = false;
  correctIcon = true;

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private db: DataupdateService, public media: MediaObserver) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit(): void {

    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }

    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md') ) {
      this.tabPosition = 'below';
    } else {
      this.tabPosition = 'above';
    }
    
    this.generatePWForm = new FormGroup({
      domain: new FormControl(''),
      generatedpw: new FormControl('')
    });
    this.generatePWForm.controls.domain.setValue('');

    this.savePWForm = new FormGroup({
      domain: new FormControl(''),
      pwtosave: new FormControl('')
    });
    this.savePWForm.controls.domain.setValue('');

  }

  submitGeneratedPW(generatePWForm){
    if (this.generatePWForm.controls.domain.value != '' && this.validateDomain(this.generatePWForm.controls.domain.value) && this.generatePWForm.controls.password.value != '') {
      this.db.syncData(generatePWForm.value).subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onErr(error)
      );
    }
  }

  submitNewPW(savePWForm){
    if (this.savePWForm.controls.domain.value != '' && this.validateDomain(this.savePWForm.controls.domain.value) && this.savePWForm.controls.password.value != '') {
      this.db.syncData(savePWForm.value).subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onErr(error)
      );
    } 
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

  onSuccess(res) {
    console.log(localStorage.getItem('name') + " Logged in!");
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

  generatePW() {
    if (this.generatePWForm.controls.domain.value != '' && this.validateDomain(this.generatePWForm.controls.domain.value)) {
        this.generatePWForm.patchValue({generatedpw: 'helloIsItMeYoureLookingFor'});
    }
  }

  resetForm() {
    this.generatePWForm.patchValue({generatedpw: '', domain: ''});
  }

  validateDomain(domain: string) {
    if (domain.length >= 6 && domain.includes('.')){
      return true;
    } else {
      return false;
    }
  }

  passStrength(pw) {
    let score = 0;
    if (!pw)
        return score;

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

