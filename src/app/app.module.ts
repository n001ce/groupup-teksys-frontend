import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{NgxWebstorageModule} from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import {CreateTeamComponent} from './team/create-team/create-team.component'
import { ViewTeamComponent } from './team/view-team/view-team.component';
import { SearchGameComponent } from './game/search-game/search-game.component';
import { ListGamesComponent } from './game/list-games/list-games.component';
import { TokenInterceptor } from './token-interceptor';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { TeamTileComponent } from './shared/team-tile/team-tile.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { GamePageComponent } from './game/game-page/game-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    CreateTeamComponent,
    SearchGameComponent,
    ViewTeamComponent,
    ListGamesComponent,
    UserProfileComponent,
    TeamTileComponent,
    SideBarComponent,
    GamePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
