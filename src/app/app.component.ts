import { Component } from '@angular/core';
import { LocalDBserviceService } from './dataservices/local-dbservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wbbpwmanclient';
  constructor(private dbservice: LocalDBserviceService) {
    console.log(this.dbservice.objectStore);
  }
}
