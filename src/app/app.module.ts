import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { GlobalmenuComponent } from './globalmenu/globalmenu.component';
import { RegistrationdialogComponent } from './registrationdialog/registrationdialog.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { StatusfooterComponent } from './statusfooter/statusfooter.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LogindialogComponent,
    GlobalmenuComponent,
    RegistrationdialogComponent,
    UserhomeComponent,
    PasswordlistComponent,
    StatusfooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
