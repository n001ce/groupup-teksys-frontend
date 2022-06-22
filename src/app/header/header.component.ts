import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data:boolean)=> this.isLoggedIn = data);
    this.authService.username.subscribe((data:string)=> this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

  goToUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  searchGames(){
    this.router.navigateByUrl('/search-game')
  }

  viewGames(){
    this.router.navigateByUrl('/list-games')
  }
  viewTeams(){
    this.router.navigateByUrl('/list-teams')
  }

  createTeam(){
    this.router.navigateByUrl('/create-team')
  }

}
