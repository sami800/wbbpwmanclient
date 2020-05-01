import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingpageComponent implements OnInit {

  currentTab = new FormControl(0);

  loggedIn: boolean;

  constructor(private route: ActivatedRoute, private auth: AuthService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
    })
  }
  
  ngOnInit() {
    this.updateCurrentTab(this.route.snapshot.data['index']);
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

}
