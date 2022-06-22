import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { GameModel } from '../game/game-response';
import { GameService } from '../game/game.service';
import { TeamModel } from '../shared/team-model';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;
  teams: Array<TeamModel>=[];
  games: Array<GameModel> = [];

  constructor(private teamService: TeamService, private authService: AuthService, private gameService: GameService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.teamService.getAllTeams().subscribe(team =>{
      this.teams = team;
    })
    this.gameService.getAllGames().subscribe(game=>{
      this.games = game;
    })
   }

  ngOnInit(): void {
  }

}
