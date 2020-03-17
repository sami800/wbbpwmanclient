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
import { AuthGuard } from './authcheck.guard';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LogindialogComponent },
  { path: 'home', component: UserhomeComponent, canActivate: [AuthGuard] },
  { path: 'passwordlist', component: PasswordlistComponent, canActivate: [AuthGuard]  },
  { path: 'newpassword', component: NewpasswordComponent, canActivate: [AuthGuard]  },
  { path: 'checkup', component: CheckupComponent, canActivate: [AuthGuard]  },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard]  },
  { path: 'usersettings', component: UsersettingsComponent, canActivate: [AuthGuard]  },
  { path: 'register', component: RegistrationdialogComponent },
  { path: 'registration', component: RegistrationdialogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
