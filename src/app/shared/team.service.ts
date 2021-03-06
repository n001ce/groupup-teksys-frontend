import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createTeam(teamPayload: CreateTeamPayload, username: string): Observable<any>{
    return this.http.post(`http://localhost:8080/api/team/${username}`, teamPayload)
  }

  getTeam(id: number): Observable<TeamModel>{
    return this.http.get<TeamModel>('http://localhost:8080/api/team/' + id);
  }

  getAllTeamsByUser(name: string): Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>('http://localhost:8080/api/team/by-user/' + name);
  }

  getTeamsByGame(gameId: number): Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>(`http://localhost:8080/api/team/game/${gameId}`)
  }

  joinTeam(teamId: number, username: String, team: CreateTeamPayload): Observable<any>{
    return this.http.put(`http://localhost:8080/api/team/${teamId}/${username}`, team)
  }

  getTeamMembers(teamId: number): Observable<Member[]>{
    return this.http.get<Member[]>(`http://localhost:8080/api/team/members/${teamId}`)
  }

  deleteTeam(team : TeamModel):Observable<any>{
    return this.http.post('http://localhost:8080/api/team/deleteTeam', team)
  }
}
