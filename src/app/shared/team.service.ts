import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../game/game-response';
import { CreateTeamPayload } from '../team/create-team/create-team.payload';
import { Member } from '../team/view-team/member.payload';
import {TeamModel} from './team-model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Array<TeamModel>>{
    return this.http.get<Array<TeamModel>>('http://localhost:8080/api/team')
  }

  createTeam(teamPayload: CreateTeamPayload): Observable<any>{
    return this.http.post('http://localhost:8080/api/team/', teamPayload)
  }

  getTeam(id: number): Observable<TeamModel>{
    return this.http.get<TeamModel>('http://localhost:8080/api/team/' + id);
  }

  getAllTeamsByUser(name: string): Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>('http://localhost:8080/api/team/by-user/' + name);
  }

  getTeamsByGame(gameTitle: string): Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>(`http://localhost:8080/api/team/game/${gameTitle}`)
  }

  joinTeam(teamId: number, username: String, team: CreateTeamPayload): Observable<any>{
    return this.http.put(`http://localhost:8080/api/team/${teamId}/${username}`, team)
  }

  getTeamMembers(teamId: number): Observable<Member[]>{
    return this.http.get<Member[]>(`http://localhost:8080/api/team/members/${teamId}`)
  }
}
