import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersettingsComponent implements OnInit {

  currentTab = new FormControl(0);

  constructor(private activatedroute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedroute.data.subscribe((data) => {
      this.updateCurrentTab(data['index']);
    })
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

}
