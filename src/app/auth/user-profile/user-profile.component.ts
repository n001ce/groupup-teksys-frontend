import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { TeamModel } from 'src/app/shared/team-model';
import { Member } from 'src/app/team/view-team/member.payload';
import { AuthService } from '../shared/auth.service';
import { ProfilePayload } from './profile.payload';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  profile: ProfilePayload;
  isOwner: boolean;
  activeTab: string;
  openform: boolean;
  members: Member[];

  
  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService, private authService: AuthService) {
    this.name = this.activatedRoute.snapshot.params['name'];
    this.activeTab='t1'
   }


  ngOnInit(): void {
    this.userAuth()
    this.getProfile()
    
  }

  private userAuth(){
    if(this.authService.getUserName() === this.name){
      this.isOwner = true
    }else{
      this.isOwner = false;
    }
  }

  getMembers(joinedTeams: TeamModel[]){
    joinedTeams.forEach(team=>{
      this.members = team.teamMembers
    })
  }

  toggle1(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  toggle2(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  toggle3(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  toggle4(activeTab : string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  private getProfile(){
    this.profileService.getProfile(this.name).subscribe(data=>{
      this.profile=data
      console.log(data)
    }, error=>{
      throwError(error)
    });
  }

}
