import { Component } from '@angular/core';
import { LocalDBserviceService } from './local-dbservice.service'
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wbbpwmanclient';
  constructor(private dbservice: LocalDBserviceService, public loginService: AuthService ) {
    console.log(this.dbservice.name); 
    this.loginService.login('test@test.pl','123').subscribe(
      response => console.log(response),
      err => console.log(err)
    );
    this.loginService.logout().subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }
}
