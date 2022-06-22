import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { GameModel } from 'src/app/game/game-response';
import { GameService } from 'src/app/game/game.service';
import { TeamModel } from 'src/app/shared/team-model';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  teams: TeamModel[];
  comments: CommentPayload[];
  games: GameModel[];
  gamesLength: number;
  teamLength: number;
  commentLength: number;

  
  constructor(private activatedRoute: ActivatedRoute, private teamService: TeamService, private commentService: CommentService, private gameService: GameService) {
    this.name = this.activatedRoute.snapshot.params['name'];

    this.teamService.getAllTeamsByUser(this.name).subscribe(data =>{
      this.teams = data;
      this.teamLength = data.length;
    })

    this.commentService.getAllCommentsByUser(this.name).subscribe((data: any[]) => {
      this.comments = data;
      this.commentLength = data.length;
    });

    this.gameService.getAllGamesByUser(this.name).subscribe((data: any[])=>{
      this.games = data;
      this.gamesLength = data.length;
    })

    


   }

  ngOnInit(): void {
  }

}
