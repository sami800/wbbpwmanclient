import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersettingsComponent implements OnInit {

  currentTab = new FormControl(0);
  loggedIn: boolean;


  constructor(private activatedroute: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit() {
    
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
    this.activatedroute.data.subscribe((data) => {
      this.updateCurrentTab(data['index']);
    })
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

}
