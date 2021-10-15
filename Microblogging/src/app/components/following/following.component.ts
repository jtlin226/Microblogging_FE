import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  following: string[] = [];

  getFollowingList()
  {
    this.following = [];
    this.userService.getFollowing(this.authService.jwt).subscribe(followingUsers =>
    {
      for (let name in followingUsers) 
      {
        this.following.push(name);
      }
    });
  }
}
