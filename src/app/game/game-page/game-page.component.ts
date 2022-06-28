import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { GameCommentPayload } from 'src/app/comment/game-comment.payload';
import { TeamModel } from 'src/app/shared/team-model';
import { TeamService } from 'src/app/shared/team.service';
import { CreateTeamComponent } from 'src/app/team/create-team/create-team.component';
import { GameModel } from '../game-response';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GamePageComponent implements OnInit {
  gameId: number;
  game: GameModel;
  teams: TeamModel[];
  commentForm: FormGroup;
  commentPayload: GameCommentPayload;
  comments: CommentPayload[];
  gameTitle: string;
  createTeam : CreateTeamComponent

  constructor(private gameService: GameService, private commentService: CommentService, private activateRoute: ActivatedRoute,private teamService: TeamService, private router: Router, private authService: AuthService) {
    this.gameId = this.activateRoute.snapshot.params['id']
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    })
    this.commentPayload={
      text: '',
      gameId: this.gameId
    }
   }

  ngOnInit(): void {
    this.getGameById()
    this.getTeamsByGame()
    this.getCommentsForGame()
    
  }
  
  gameComment(){
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postGameComment(this.commentPayload).subscribe(data=>{
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForGame();
    }, error=>{
      throwError(error)
    })
  }

  
  

  private getGameById(){
      this.gameService.getGame(this.gameId).subscribe(data=>{
        this.game=data;
        this.gameTitle=data.gameTitle;
        console.log(this.game)
      }, error=>{
        throwError(error)
      })
    }

    private getTeamsByGame(){
      this.teamService.getTeamsByGame(this.gameId).subscribe(data=>{
        this.teams = data;
        console.log(this.teams)
      }, error=>{
        throwError(error)
      })
    }

    private getCommentsForGame(){
      this.commentService.getAllCommentsForGame(this.gameId).subscribe(data=>{
        this.comments = data;
      }, error=>{
        throwError(error)
      })
    }

    
   createTeamFromGame(){
      this.createTeam.teamPayload.gameTitle = this.gameTitle;
      this.createTeam.teamPayload.console = this.createTeam.createTeamForm.get('console')?.value;
      this.createTeam.teamPayload.teamName = this.createTeam.createTeamForm.get('teamName')?.value;
      this.createTeam.teamPayload.username = this.authService.getUserName();
      this.createTeam.teamPayload.url = "/view-team/" + this.createTeam.createTeamForm.get('teamName')?.value;

      this.teamService.createTeam(this.createTeam.teamPayload, this.authService.getUserName()).subscribe(()=>{
        this.router.navigateByUrl(`/view-game/${this.gameTitle}`);
      }, error=>{
        throwError(error)
      })
    }

}

