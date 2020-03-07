import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalmenu',
  templateUrl: './globalmenu.component.html',
  styleUrls: ['./globalmenu.component.css']
})
export class GlobalmenuComponent implements OnInit {

  showText = false;

  constructor() { }

  ngOnInit(): void {
    this.showText = false;
  }

}

