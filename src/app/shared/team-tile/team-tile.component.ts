import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamModel } from '../team-model';
import {Router} from '@angular/router'
import { GameService } from 'src/app/game/game.service';
import { GameModel } from 'src/app/game/game-response';

@Component({
  selector: 'app-team-tile',
  templateUrl: './team-tile.component.html',
  styleUrls: ['./team-tile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamTileComponent implements OnInit {

  @Input() teams: TeamModel[];
  @Input() games: GameModel[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToTeam(id: number): void{
    this.router.navigateByUrl('/view-team/'+ id)
  }

 

}
