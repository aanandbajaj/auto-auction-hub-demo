// import http and angular components
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// define component metadata
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// implementation of components behavior
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string = '';
  loginError:boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService:AuthService) { } // Add Router module to constructor

  login() {
    console.log(this.username);
    console.log(this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response); // Handle successful login here
        this.authService.setUserLoggedIn();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.loginError = true;
        this.errorMessage = "Invalid Credentials";
      }
    );
  }
}
