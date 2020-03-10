import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { HelpComponent } from './help/help.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { CheckupComponent } from './checkup/checkup.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegistrationdialogComponent } from './registrationdialog/registrationdialog.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LogindialogComponent },
  { path: 'home', component: UserhomeComponent },
  { path: 'passwordlist', component: PasswordlistComponent },
  { path: 'newpassword', component: NewpasswordComponent },
  { path: 'checkup', component: CheckupComponent },
  { path: 'help', component: HelpComponent },
  { path: 'usersettings', component: UsersettingsComponent },
  { path: 'register', component: RegistrationdialogComponent },
  { path: 'registration', component: RegistrationdialogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
