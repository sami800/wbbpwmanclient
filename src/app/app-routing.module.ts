import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { PasswordlistComponent } from './passwordlist/passwordlist.component';
import { RegistrationdialogComponent } from './registrationdialog/registrationdialog.component';


const routes: Routes = [
  { path: '', component: UserhomeComponent },
  { path: 'login', component: LogindialogComponent },
  { path: 'home', component: UserhomeComponent },
  { path: 'passwordlist', component: PasswordlistComponent },
  { path: 'registration', component: RegistrationdialogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
