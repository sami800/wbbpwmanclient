import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingpageComponent implements OnInit {

  currentTab = new FormControl(0);

  constructor() {
  }

  ngOnInit(): void {
  }

  updateCurrentTab(x: number){
    this.currentTab.setValue(x);
  }

}
