import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { user } from '../model/user-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url = 'User';
  private userPayload: any;

  constructor(private http: HttpClient, private route: Router) { 
    this.userPayload = this.decodedToken();
  }


  //API SERVICE

  public getAllUsers(): Observable<user[]>{
    return this.http.get<user[]>(`${environment.apiURL}/${this.url}`);
  }

  public getOneUser(): Observable<user>{
    return this.http.get<user>(`${environment.apiURL}/${this.url}`);
  }

  public createUser(newUser: any){
    return this.http.post<any>(`${environment.apiURL}/${this.url}`, newUser); 
  }

  public updateUser(updateUser: user): Observable<user>{
    return this.http.put<user>(`${environment.apiURL}/${this.url}`, updateUser);
  }

  public deleteUser(delUser: user): Observable<user>{
    return this.http.delete<user>(`${environment.apiURL}/${this.url}/${delUser.userID}`);
  }

  // //AUTHENTICATE SERVICE

  public loginUser(login: any){
    return this.http.post<any>(`${environment.apiURL}/${this.url}/authenticate`, login);
  }

  public storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  public signOutUser(){
    localStorage.clear();
    this.route.navigate(['login']);
  }

  public decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  public getUserNameFromToken(){
    if(this.userPayload){
      return this.userPayload.name;
    }
  }

  public getEmailFromToken(){
    if(this.userPayload){
      return this.userPayload.email;
    }
  }

  public getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }
}
