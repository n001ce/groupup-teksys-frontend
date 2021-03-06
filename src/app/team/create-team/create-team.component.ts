import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/shared/team.service';
import { CreateTeamPayload } from './create-team.payload';
import { GameModel } from 'src/app/game/game-response';
import { GameService } from 'src/app/game/game.service';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  @Input() gameTitle: string
  createTeamForm: FormGroup;
  teamPayload: CreateTeamPayload;
  games: Array<GameModel>;

  constructor(private router: Router, private teamService : TeamService, private gameService: GameService, private authService: AuthService) { 
    this.teamPayload = {
      teamName: '',
      console: '',
      gameTitle: '',
      teamSize: 0,
      username: '',
    }
  }

  ngOnInit(): void {
    this.createTeamForm = new FormGroup({
      teamName: new FormControl('', Validators.required),
      gameTitle: new FormControl('', Validators.required),
      console: new FormControl('', Validators.required),
      teamSize: new FormControl('', Validators.required)
    });
    this.gameService.getAllGames().subscribe(data=>{
      this.games = data;
    }, error=>{
      throwError(error);
    });
  }

  createTeam(){
    this.teamPayload.teamName = this.createTeamForm.get('teamName')?.value;
    if(this.gameTitle == null){
      this.teamPayload.gameTitle = this.createTeamForm.get('gameTitle')?.value;
    }else{
      this.teamPayload.gameTitle = this.gameTitle
    }
    this.teamPayload.username = this.authService.getUserName();
    this.teamPayload.teamSize = this.createTeamForm.get('teamSize')?.value;
    this.teamPayload.url = "/view-team/" + this.createTeamForm.get('teamName')?.value;
    this.teamPayload.console = this.createTeamForm.get('console')?.value;

    this.teamService.createTeam(this.teamPayload, this.authService.getUserName()).subscribe(()=>{
      this.router.navigateByUrl('/list-teams');
    }, (error: any)=>{
      throwError(error);
    })
  }

  discardTeam(){
    this.router.navigateByUrl('/home');
  }

}
