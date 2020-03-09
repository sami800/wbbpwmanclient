import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { GlobalmenuComponent } from './globalmenu/globalmenu.component';
import { RegistrationdialogComponent } from './registrationdialog/registrationdialog.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { StatusfooterComponent } from './statusfooter/statusfooter.component';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CheckupComponent } from './checkup/checkup.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { HelpComponent } from './help/help.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'; 

import { AuthService } from './auth.service';
import { LocalDBserviceService } from './local-dbservice.service';


@NgModule({
  declarations: [
    AppComponent,
    LogindialogComponent,
    GlobalmenuComponent,
    RegistrationdialogComponent,
    UserhomeComponent,
    PasswordlistComponent,
    StatusfooterComponent,
    CheckupComponent,
    NewpasswordComponent,
    HelpComponent,
    UsersettingsComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ AuthService, LocalDBserviceService ],
  bootstrap: [ AppComponent ],
  exports: [ MatSidenavModule, FlexLayoutModule, HttpClientModule ]
})
export class AppModule { }
