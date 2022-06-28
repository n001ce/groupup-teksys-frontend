import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/shared/team-model';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css'],
  
})
export class ListTeamComponent implements OnInit {
  @Input() teamArray: TeamModel[]
  teams: TeamModel[];
  activeTab: string;

  constructor(private router: Router, private teamService: TeamService) { 
    this.teamService.getAllTeams().subscribe(team=>{
      this.teams = team;
    })
    this.activeTab="all"
  }

  ngOnInit(): void {
  }

  goToTeam(id: number): void{
    this.router.navigateByUrl('/view-team/' + id)
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
