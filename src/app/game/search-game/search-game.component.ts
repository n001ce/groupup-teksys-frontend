import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GameModel} from '../game-response';
import {Router, ActivatedRoute} from '@angular/router';
import { GameService } from '../game.service';
import { findIndex, throwError } from 'rxjs';
import { Api } from '../title-response';
import { IdResponse } from '../id-response';

@Component({
  selector: 'app-create-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {
  searchGameForm: FormGroup;
  gameModel: GameModel;
  gameArray: Array<Api['results']>;
  gameResponse: IdResponse;


  constructor(private router: Router, private gameService: GameService){
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
  }

  discard(){
    this.gameArray=[]
  }

  searchGame(){
    if(this.gameArray !== []){
      this.discard()
    }
    this.gameService.searchGame(this.searchGameForm.get('gameTitle')?.value)
      .subscribe((data: Api)=>{
        this.gameArray.push(data['results']);
        console.log(this.gameArray)
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


