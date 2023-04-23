import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { StoreUserService } from 'src/app/service/store-user.service';

@Component({
  selector: 'app-logged-in-page',
  templateUrl: './logged-in-page.component.html',
  styleUrls: ['./logged-in-page.component.scss']
})
export class LoggedInPageComponent implements OnInit {

  public username: string = "";

  constructor(private service: LoginServiceService, private store: StoreUserService) { }

  ngOnInit(): void {
    this.store.getUserNameFromStore().subscribe(value => {
      let getUsernameFromToken = this.service.getUserNameFromToken();
      this.username = value || getUsernameFromToken;
    })
  }

  signOut(){
    this.service.signOutUser();
  }
}
