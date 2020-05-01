import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  loggedIn: boolean;
  
  constructor(private router: Router, private auth: AuthService) {
    this.auth.isAuthenticated().subscribe(val => {
      this.loggedIn = val.valueOf();
      })
  }

  ngOnInit() { 
    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
  }
}
