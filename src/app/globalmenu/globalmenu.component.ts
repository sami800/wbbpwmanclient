import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'app-globalmenu',
  templateUrl: './globalmenu.component.html',
  styleUrls: ['./globalmenu.component.css']
})
export class GlobalmenuComponent implements OnInit {

  showText = false;
  logoUrl = 'assets/img/WBBLogo.webp';
  logoWidth = '25px';
  logoHeight = '25px';

  constructor(public router: Router, public media: MediaObserver) { }

  ngOnInit(): void {
    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md') ) {
      this.logoUrl = 'assets/img/WBBLogoSm.webp';
      this.logoWidth = '45px';
      this.logoHeight = '45px';
      this.showText = false;
    } else {
      this.showText = true;
      this.logoWidth = '100px';
      this.logoHeight = '100px';
      this.logoUrl = 'assets/img/WBBLogo.webp';
    }
  }

  navigateToLink(url: string) {
    this.router.navigateByUrl(url);
  }

}

