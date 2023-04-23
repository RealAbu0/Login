import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { user } from 'src/app/model/user-model'
@Component({
  selector: 'app-show-users-page',
  templateUrl: './show-users-page.component.html',
  styleUrls: ['./show-users-page.component.scss']
})
export class ShowUsersPageComponent implements OnInit {

  _users: user[] = [];

  constructor(private service: LoginServiceService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(){
    this.service.getAllUsers().subscribe({
      next: (result) =>{
        this._users = result;
        console.log(result);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

}
