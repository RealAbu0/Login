import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { StoreUserService } from 'src/app/service/store-user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  loginForm!: FormGroup
  constructor(private fb: FormBuilder, private service: LoginServiceService, private router: Router, private toast: NgToastService, private store: StoreUserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      // send data to db 
      console.log(this.loginForm.value);
      this.service.loginUser(this.loginForm.value).subscribe({
        next:(result) =>{
          this.service.storeToken(result.token);
          const tokenPayload = this.service.decodedToken();
          this.store.setUserNameFromStore(tokenPayload.name);
          this.store.setEmailFromStore(tokenPayload.email);
          this.store.setERoleFromStore(tokenPayload.role);
          this.toast.success({detail: "Sucessfull", summary: result.message, duration: 5000});
          console.log(result);
          this.router.navigate(['loggedin']);
        },
        error: (response) =>{
          this.toast.error({detail: "Error", summary: response.message, duration: 5000})
          //alert(response?.error.message);
          console.log('error', response);
        }
        
      });
    }
    else{
      // throw an error
     
      this.validateAllFormsFields(this.loginForm);
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
