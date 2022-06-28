import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  check:boolean
  isLoggedIn:boolean;
  constructor(private authService : AuthService) { 
    this.isLoggedIn = this.authService.isLoggedIn();

  }

  ngOnInit(): void {
  }

  swap(){
    this.check= !this.check;
    console.log(this.check)
  }

}
