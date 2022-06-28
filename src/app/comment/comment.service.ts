import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import {CommentPayload} from './comment.payload'
import { Observable } from "rxjs";
import { GameCommentPayload } from "./game-comment.payload";

@Injectable({
    providedIn: 'root'
})

export class CommentService{

    constructor(private httpClient: HttpClient){}

    getAllCommentsForTeam(teamId : number): Observable<CommentPayload[]>{
        return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-team/' + teamId);
    }

    postTeamComment(commentPayload : CommentPayload) : Observable<any>{
        return this.httpClient.post<any>(`http://localhost:8080/api/comments`, commentPayload);
    }
    postGameComment(gameCommentPayload : GameCommentPayload) : Observable<any>{
        return this.httpClient.post<any>(`http://localhost:8080/api/comments/game`, gameCommentPayload);
    }

    getAllCommentsByUser(name: string){
        return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-user/' + name);
    }

    getAllCommentsForGame(gameId: number): Observable<CommentPayload[]>{
        return this.httpClient.get<any>('http://localhost:8080/api/comments/by-game/' + gameId);
    }

    deleteComment(comment: CommentPayload): Observable<any>{
        return this.httpClient.delete<any>('http://localhost:8080/api/comments/delete/' + comment.id)
    }

    editComment(comment: CommentPayload): Observable<any>{
        return this.httpClient.put<any>('http://localhost:8080/api/comments/edit', comment)
    }
}