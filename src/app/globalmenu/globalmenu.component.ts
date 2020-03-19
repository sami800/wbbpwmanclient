import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-globalmenu',
  templateUrl: './globalmenu.component.html',
  styleUrls: ['./globalmenu.component.css']
})
export class GlobalmenuComponent implements OnInit {

  showText = false;
  menuMode = 'push';
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
      this.logoWidth = '55px';
      this.logoHeight = '55px';
      this.showText = false;
    } else {
      this.showText = true;
      this.logoWidth = '150px';
      this.logoHeight = '150px';
      this.logoUrl = 'assets/img/WBBLogo.webp';
    }
  }

  logout() {
    this.auth.signOut().subscribe((res)=>{
      console.log(res);
      console.log(localStorage.getItem('name') + " Logged Out!");
    });    
  }

  navigateToLink(url: string) {
    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md') ) {
      this.showText = false;
    }
    this.router.navigateByUrl(url);
  }

}

