import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataupdateService } from '../dataservices/dataupdate.service';
import { LocalDBserviceService } from '../dataservices/local-dbservice.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  currentTab = new FormControl(0);
  tabPosition = 'above';
  loggedIn: boolean;
  generatePWForm: FormGroup;
  savePWForm: FormGroup;
  visibilityIcon = false;
  correctIcon = true;
  todaysDate: string;

  constructor(private router: Router, private auth: AuthService,
    private snackBar: MatSnackBar, private db: DataupdateService,
    public media: MediaObserver, private localdb: LocalDBserviceService) {

    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
    })
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    this.todaysDate = year+'-'+month+'-'+day;

    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md') )
    this.tabPosition = 'below';
    else
    this.tabPosition = 'above';
  }

  ngOnInit(): void {
    this.currentTab.setValue(0);

    this.generatePWForm = new FormGroup({
      domain: new FormControl(''),
      pw: new FormControl(''),
      newid: new FormControl(''),
      updatedate: new FormControl(this.todaysDate)
    });

    this.savePWForm = new FormGroup({
      domain: new FormControl(''),
      pw: new FormControl(''),
      newid: new FormControl(''),
      updatedate: new FormControl(this.todaysDate)
    });

    this.generatePWForm.controls.domain.setValue('');
    this.savePWForm.controls.domain.setValue('');

    if (!this.loggedIn)
    this.router.navigate(['/login'])

  }

  submitGeneratedPW(generatePWForm){
    if (generatePWForm.controls.domain !== '' && generatePWForm.controls.password !== '')
      this.localdb.addPassword(generatePWForm.value)
      this.db.addPassword(generatePWForm.value).subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onErr(error)
    );
  }

  submitNewPW(savePWForm){
    if (savePWForm.controls.domain !== '' && savePWForm.controls.password !== '')
      this.localdb.addPassword(savePWForm.value)
      this.db.addPassword(savePWForm.value).subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onErr(error)
    );
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

  onSuccess(res) {
    console.log(localStorage.getItem('name') + ' Logged in!');
  }

  onErr(err) {
    this.openSnackBar('Unable to connect', 'Close');
    console.log(err);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, { panelClass: ['blue-snackbar']});
  }

  generatePW() {
    if (this.generatePWForm.controls.domain.value !== '' && this.validateDomain(this.generatePWForm.controls.domain.value))
        this.generatePWForm.patchValue({pw: 'helloIsItMeYoureLookingFor'});
  }

  resetForm() {
    this.generatePWForm.patchValue({pw: '', domain: ''});
    this.savePWForm.patchValue({pw: '', domain: ''});
  }

  validateDomain(domain: string) {
    if (domain.length >= 6 && domain.includes('.'))
      return true;
    else 
      return false;
  }

  passStrength(pw) {
    let pwstrength = 0;
    if (!pw)
        return pwstrength;

    const letters = new Object();
    for (let i=0; i <= pw.length; i++) {
        letters[pw[i]] = (letters[pw[i]] || 0) + 1;
        pwstrength += 5.0 / letters[pw[i]];
    }

    const variations = {
        digits: /\d/.test(pw),
        lower: /[a-z]/.test(pw),
        upper: /[A-Z]/.test(pw),
        special: /!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(pw),
    }

    let variationCount = 0;
    for (const varient in variations) {
        variationCount += (variations[varient] == true) ? 1 : 0;
    }
    pwstrength += (variationCount - 1) * 10;
    return pwstrength;
  }
}

