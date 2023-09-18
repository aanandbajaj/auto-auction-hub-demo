import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare var google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{

  firstName = '';
  lastName = '';
  username = '';
  password = '';
  phoneNumber = '';
  homeAddress = ''; // Add this line to declare the homeAddress property
  email = '';


  isSignupComplete:boolean = false;

  constructor(private http: HttpClient, private authService:AuthService) {

  }
  

  signup() {
    const signupData = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      phoneNumber: this.phoneNumber,
      homeAddress: this.homeAddress,
      email: this.email
    };
  
    this.authService.signup(signupData).subscribe(response => {
      console.log(response);
    });

    this.onSignupSuccess()
  }

  onSignupSuccess(){
    this.isSignupComplete = true;
  }

}
