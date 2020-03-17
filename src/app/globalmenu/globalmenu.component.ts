import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { AuthService } from '../auth.service';

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
  openOrClosed = true;

  constructor(public router: Router, public media: MediaObserver, public auth: AuthService ) {
    auth.isAuthenticated().subscribe(val => {
      this.openOrClosed = val.valueOf();
      })
  }

  ngOnInit(): void {

    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md') ) {
      this.logoUrl = 'assets/img/WBBLogoSm.webp';
      this.logoWidth = '40px';
      this.logoHeight = '40px';
      this.showText = false;
    } else {
      this.showText = true;
      this.logoWidth = '100px';
      this.logoHeight = '100px';
      this.logoUrl = 'assets/img/WBBLogo.webp';
    }
  }

  logout() {
    this.auth.signOut(JSON.parse(localStorage.getItem('username'))).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  navigateToLink(url: string) {
    this.router.navigateByUrl(url);
  }

}

