import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FollowingComponent } from './components/following/following.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyFollowersComponent } from './components/my-followers/my-followers.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'my-followers', component: MyFollowersComponent },
  { path: 'following', component: FollowingComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'edit-password', component: EditPasswordComponent },
  { path: 'search-users', component: SearchUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
