import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { GameModel } from '../game-response';
import { GameService } from '../game.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Array<GameModel>;
  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(data=>{
      this.games=data;
      console.log(this.games)
    }, error =>{
      throwError(error)
    })
  }

  followGame(gameModel: GameModel){
    this.gameService.followGame(gameModel)
  }

}
