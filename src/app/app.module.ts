import { environment } from '../environments/environment';

// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';


// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


// Generated components
import { CheckupComponent } from './checkup/checkup.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { HelpComponent } from './help/help.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { GlobalmenuComponent } from './globalmenu/globalmenu.component';
import { RegistrationdialogComponent } from './registrationdialog/registrationdialog.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { NewSnackBarMessage } from './snack-bar-message/snack-bar-message.component';

// Generated services
import { AuthService } from './auth/auth.service'; // Checks details with server
import { LocalDBserviceService } from './dataservices/local-dbservice.service'; // Used for Local data manipulation
import { DataupdateService } from './dataservices/dataupdate.service'; // Syncs from server


@NgModule({
  declarations: [
    AppComponent,
    LogindialogComponent,
    GlobalmenuComponent,
    RegistrationdialogComponent,
    UserhomeComponent,
    PasswordlistComponent,
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
    MatGridListModule,
    ClipboardModule,
    MatRippleModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [ NewSnackBarMessage ],
  providers: [ AuthService, LocalDBserviceService, DataupdateService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}} ],
  bootstrap: [ AppComponent ],
  exports: [ MatSidenavModule, FlexLayoutModule, HttpClientModule, MatFormFieldModule, MatSnackBarModule, MatGridListModule ]
})
export class AppModule { }
