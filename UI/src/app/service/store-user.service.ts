import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {

  private fullName$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

  //FullName
  public getUserNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setUserNameFromStore(name: string){
    this.fullName$.next(name);
  }


  //Email
  public getEmailFromStore(){
    return this.email$.asObservable();
  }

  public setEmailFromStore(email: string){
    this.email$.next(email);
  }


  //Phone Number  
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setERoleFromStore(role: string){
    this.role$.next(role);
  }
}
