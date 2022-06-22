import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { TeamModel } from 'src/app/shared/team-model';
import { TeamService } from 'src/app/shared/team.service';
import { CreateTeamPayload } from '../create-team/create-team.payload';
import { Member } from './member.payload';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
  teamId: number;
  team: TeamModel;
  members: Member[];
  member: Member;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  teamPayload: CreateTeamPayload;


  constructor(private teamService: TeamService, private activateRoute: ActivatedRoute, private commentService: CommentService, private router: Router, private authService: AuthService) { 
    this.teamId = this.activateRoute.snapshot.params['id']
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    })

    this.commentPayload={
      text: '',
      teamId: this.teamId
    }

  }

  ngOnInit(): void {
    this.getTeamById()
    this.getCommentsForTeam()
    this.getTeamMembers()
  }

  teamComment(){
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data=>{
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForTeam();
    }, error =>{
      throwError(error)
    })
  }

  joinTeam(){
    this.teamService.joinTeam(this.teamId, this.authService.getUserName(), this.teamPayload).subscribe(()=>{
      this.router.navigateByUrl(`/view-team/${this.teamId}`);
    }, error=>{
      throwError(error)
    })
  }

  private getTeamMembers(){
    this.teamService.getTeamMembers(this.teamId).subscribe(data=>{
      this.members=data;
    }, error=>{
      throwError(error)
    })
  }

  private getTeamById(){
    this.teamService.getTeam(this.teamId).subscribe(data=>{
      this.team = data;
      this.teamPayload=data;
      this.members=data.teamMembers
    }, error =>{
      throwError(error)
    })
  }

  private getCommentsForTeam(){
    this.commentService.getAllCommentsForTeam(this.teamId).subscribe(data=>{
      this.comments = data;
    }, error =>{
      throwError(error)
    })
  }

}
