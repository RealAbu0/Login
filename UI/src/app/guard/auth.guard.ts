import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginServiceService, private route: Router, private toast: NgToastService){
  }
  canActivate():boolean {
    if(this.service.isLoggedIn()){
      return true;
    }
    else{
      this.toast.error({detail: "ERROR", summary: "PLEASE LOGIN FIRST"});   
      this.route.navigate(['login']);
          return false;
    }
   }
  
}
