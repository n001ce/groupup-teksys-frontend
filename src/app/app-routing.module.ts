import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewTeamComponent } from './team/view-team/view-team.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ListGamesComponent } from './game/list-games/list-games.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { SearchGameComponent } from './game/search-game/search-game.component';
import { GamePageComponent } from './game/game-page/game-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view-team/:id', component: ViewTeamComponent, canActivate:[AuthGuard]},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'list-games', component: ListGamesComponent},
  {path: 'view-game/:id', component:GamePageComponent},
  {path: 'create-team', component: CreateTeamComponent, canActivate: [AuthGuard]},
  {path: 'search-game', component: SearchGameComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
