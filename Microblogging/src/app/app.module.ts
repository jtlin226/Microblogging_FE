import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FollowingComponent } from './components/following/following.component';
import { MyFollowersComponent } from './components/my-followers/my-followers.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    FollowingComponent,
    MainPageComponent,
    MyFollowersComponent,
    ProfilePageComponent,
    EditProfileComponent,
    FollowButtonComponent,
    ForgotPasswordComponent,
    EditPasswordComponent,
    SearchUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
