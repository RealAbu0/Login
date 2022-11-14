import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPageComponent } from './components/create-account-page/create-account-page.component';
import { ForgottenDetailsPageComponent } from './components/forgotten-details-page/forgotten-details-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
