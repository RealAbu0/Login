import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { StoreUserService } from 'src/app/service/store-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public username: string = "";
  public email: string = "";
  public role: string = "";

  constructor(private service: LoginServiceService, private store: StoreUserService) { }

  ngOnInit(): void {
    this.store.getUserNameFromStore().subscribe(value => {
      let usernameFromToken = this.service.getUserNameFromToken();
      this.username = value || usernameFromToken;
    });

    this.store.getEmailFromStore().subscribe(value => {
      let emailFromToken = this.service.getEmailFromToken();
      this.email = value || emailFromToken;
    });

    this.store.getRoleFromStore().subscribe(value => {
      let roleFromToken = this.service.getRoleFromToken();
      this.role = value || roleFromToken;
    });
  }

}
