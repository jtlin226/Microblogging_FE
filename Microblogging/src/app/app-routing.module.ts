import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowingComponent } from './components/following/following.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyFollowersComponent } from './components/my-followers/my-followers.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'my-followers', component: MyFollowersComponent },
  { path: 'following', component: FollowingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
