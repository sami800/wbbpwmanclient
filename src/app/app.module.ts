import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatTabsModule } from '@angular/material/tabs';

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
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CheckupComponent } from './checkup/checkup.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { HelpComponent } from './help/help.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth/auth.service';
import { LocalDBserviceService } from './dataservices/local-dbservice.service';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NewSnackBarMessage } from './snack-bar-message/snack-bar-message.component';


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
    LandingpageComponent,
    NewSnackBarMessage,
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
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [ NewSnackBarMessage ],
  providers: [ AuthService, LocalDBserviceService, {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}} ],
  bootstrap: [ AppComponent ],
  exports: [ MatSidenavModule, FlexLayoutModule, HttpClientModule, MatFormFieldModule, MatSnackBarModule ]
})
export class AppModule { }
