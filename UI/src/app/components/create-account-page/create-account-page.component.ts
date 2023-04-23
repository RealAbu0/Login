import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { user } from 'src/app/model/user-model';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  signUpForm!: FormGroup
  addUserReq: user = {
    userID: 0,
    username: '',
    phoneNumber: 0,
    emailAddress: '',
    password: '',
    token: '',
    role: ''
  }
  constructor(private service: LoginServiceService, private router: Router, private fb: FormBuilder) { }

  

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  addUser(){
    if(this.signUpForm.valid){
      this.service.createUser(this.signUpForm.value).subscribe({
        next: (result) =>{
          alert(result.message);
          console.log(result);
          this.router.navigate(['loggedin']);
        },
        error: (response)=>{
          alert(response?.error.message);
          console.log("error", response);
        }
      });
      
    }
    else{
      this.validateAllFormsFields(this.signUpForm);
      console.log("Your Form is invalid");
    }
    
  }

  private validateAllFormsFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(fields => {
      const control = formGroup.get(fields);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormsFields(control);
      }
    });
  }

}
