import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { HelpComponent } from './help/help.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { CheckupComponent } from './checkup/checkup.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthGuard } from './auth/authcheck.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: LandingpageComponent, data: {index: 0}},
  { path: 'login', component: LandingpageComponent, data: {index: 1}},
  { path: 'home', component: UserhomeComponent, canActivate: [AuthGuard]},
  { path: 'passwordlist', component: PasswordlistComponent, canActivate: [AuthGuard] },
  { path: 'newpassword', component: NewpasswordComponent, canActivate: [AuthGuard], data: {index: 0}},
  { path: 'checkup', component: CheckupComponent, canActivate: [AuthGuard] },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard] },
  { path: 'usersettings', component: UsersettingsComponent, canActivate: [AuthGuard], data: { index: 0}},
  { path: 'register', component: LandingpageComponent, data: {index: 2}},
  { path: 'registration', component: LandingpageComponent, data: {index: 2}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
