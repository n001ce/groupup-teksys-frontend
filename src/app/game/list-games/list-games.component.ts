import { Component, Input, OnInit } from '@angular/core';
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
  activeTab: string;
  games: Array<GameModel>;
  name: string;
  constructor(private gameService: GameService, private authService: AuthService) { 
    this.name = this.authService.getUserName();
    this.activeTab="all"

  }
  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(data=>{
      this.games=data;
      console.log(this.games)
    }, error =>{
      throwError(error)
    })
  }

  followGame(game: GameModel){
    this.gameService.followGame(game, this.name).subscribe(data=>{
      console.log(data)
    },error=>{
      throwError(error)
    })
  }

  toggleAll(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  togglePs(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  toggleXb(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  togglePc(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  toggleN(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

}
