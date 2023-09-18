import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  isLoggedIn:boolean = false;

  constructor(private authService:AuthService){
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }



  logout(){
    this.authService.logout();
  }

}
