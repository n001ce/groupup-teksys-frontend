import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GameModel} from '../game-response';
import {Router, ActivatedRoute} from '@angular/router';
import { GameService } from '../game.service';
import { findIndex, throwError } from 'rxjs';
import { Api } from '../title-response';
import { IdResponse } from '../id-response';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {
  savedGames: GameModel[]
  searchGameForm: FormGroup;
  gameModel: GameModel;
  gameArray: Array<Api['results']>;
  gameResponse: IdResponse;
  isSaved: Boolean;
  name: string


  constructor(private router: Router, private gameService: GameService, private authService : AuthService){
    this.gameModel= {
      gameTitle: '',
      description: '',
      background_image: ''
    }
    this.gameArray=[]
    }


  ngOnInit(): void {
    this.searchGameForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required)
    })
    this.getSavedGames()
    this.name = this.authService.getUserName()
  }

  discard(){
    this.gameArray=[]
    this.searchGameForm.reset;
  }

  searchGame(){
    if(this.gameArray !== []){
      this.discard()
    }
      this.gameService.searchGame(this.searchGameForm.get('gameTitle')?.value)
      .subscribe((data: Api)=>{
        this.checkSavedGames(data['results']);
        this.gameArray.push(data['results']);
        console.log(this.gameArray)
      })
    }

    private getSavedGames(){
      this.gameService.getAllGames().subscribe(data=>{
        this.savedGames = data;
      })
    }
  
    checkSavedGames(games : Api['results']){
      games.forEach(game1=>{
        this.savedGames.forEach(game=>{
          if(game1.name === game.gameTitle){
            game1.isSaved = true
          }
          else{
            game1.isSaved = false
          }
        })
      })
    }
  
  createGame(gameId : number){
    this.gameService.getGameById(gameId).subscribe((data:IdResponse)=>{
      this.gameModel.gameTitle = data.name;
      this.gameModel.description = data.description_raw;
      this.gameModel.background_image = data.background_image;
      console.log(this.gameModel)
      this.gameService.createGame(this.gameModel).subscribe(data=>{
        console.log(data);
        this.router.navigateByUrl('/list-games');
      }, error =>{
        throwError(error);
      })
    })
  }
}


