import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPageComponent } from './components/create-account-page/create-account-page.component';
import { ForgottenDetailsPageComponent } from './components/forgotten-details-page/forgotten-details-page.component';
import { LoggedInPageComponent } from './components/logged-in-page/logged-in-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowUsersPageComponent } from './components/show-users-page/show-users-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:LoginPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path: 'create',
    component: CreateAccountPageComponent
  },
  {
    path: 'forgotten',
    component: ForgottenDetailsPageComponent
  },
  {
    path: 'loggedin',
    component: LoggedInPageComponent,
    canActivate:([AuthGuard])
  },
  {
    path: 'showusers',
    component: ShowUsersPageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:([AuthGuard])
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
