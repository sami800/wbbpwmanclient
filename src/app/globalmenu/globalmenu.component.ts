import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-globalmenu',
  templateUrl: './globalmenu.component.html',
  styleUrls: ['./globalmenu.component.css']
})
export class GlobalmenuComponent implements OnInit {

  showText = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.showText = false;
  }

  navigateToLink(url: string) {
    this.router.navigateByUrl(url);
  }

}

