import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{GameModel} from './game-response'
import { Observable} from 'rxjs';
import { Api } from './title-response';
import { IdResponse } from './id-response';

@Injectable({
    providedIn: 'root'
})


export class GameService{
    constructor(private http: HttpClient){}

    getAllGames(): Observable<Array<GameModel>>{
        return this.http.get<Array<GameModel>>('http://localhost:8080/api/games');
    }

    getGame(gameId: number):Observable<GameModel>{
        return this.http.get<GameModel>(`http://localhost:8080/api/games/${gameId}`)
    }

    createGame(gameModel: GameModel): Observable<GameModel>{
        return this.http.post<GameModel>('http://localhost:8080/api/games',
        gameModel);
    }

    searchGame(gameTitle: String): Observable<Api>{
        return this.http.get<Api>(`http://localhost:8080/api/search/by-title/${gameTitle}`)
    }

    getGameById(gameId: number): Observable<IdResponse>{
        return this.http.get<IdResponse>(`http://localhost:8080/api/search/by-id/${gameId}`)
    }

    getAllGamesByUser(name: string){
        return this.http.get<GameModel[]>('http://localhost:8080/api/games/by-user/' + name);
    }

    followGame(gameModel : GameModel): Observable<GameModel>{
        return this.http.post<GameModel>("http://localhost:8080/api/games/followGame", gameModel)
    }
    
}