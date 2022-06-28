import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProfilePayload } from 'src/app/auth/user-profile/profile.payload';
import { ProfileService } from 'src/app/auth/user-profile/profile.service';
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
  commentName: string;
  edit: boolean;
  activeTab: string
  date: string
  newDate= new Date();
  activeComment: CommentPayload;
  username: string;

  constructor(private teamService: TeamService, private activateRoute: ActivatedRoute, private commentService: CommentService, private router: Router, private authService: AuthService, @Inject(LOCALE_ID) private locale: string) { 
    this.teamId = this.activateRoute.snapshot.params['id']
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    })

    this.activeTab="comments"
    this.username = this.authService.getUserName();
    
    this.commentPayload={
      text: '',
      teamId: this.teamId
    }
    this.date = formatDate(Date.now(), 'yyyy-MM-dd', this.locale)
    
  }
  
  ngOnInit(): void {
    this.getTeamById()
    this.getCommentsForTeam()
    this.getTeamMembers()
    this.edit=false;
  }

  teamComment(){
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentPayload.userName = this.username;
    this.commentService.postTeamComment(this.commentPayload).subscribe(data=>{
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForTeam();
    }, error =>{
      throwError(error)
    })
  }

  editThis(comment: CommentPayload){
    this.activeComment = comment;
    this.edit=true
  }

  editComment(comment: CommentPayload){
    this.commentPayload.text= this.commentForm.get('text')?.value;
    this.commentPayload.id = comment.id
    this.commentPayload.userName = comment.userName
    this.commentPayload.createdDate= this.newDate;
    this.commentService.editComment(this.commentPayload).subscribe(data=>{
      window. location. reload();
    }, error=>{
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

  deleteComment(comment: CommentPayload){
    this.commentService.deleteComment(comment).subscribe(data=>{
      console.log(data);
    }, error=>{
      throwError(error)
    })
  }


  

  private getTeamMembers(){
    this.teamService.getTeamMembers(this.teamId).subscribe(data=>{
      this.members = data;
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
      console.log(data);
    }, error =>{
      throwError(error)
    })
  }


  toggleComments(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  toggleTm(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

}
