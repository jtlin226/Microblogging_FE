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

  ngOnInit() 
  {
    this.getFollowingList();
  }

  following: User[] = [];

  getFollowingList()
  {
    this.following = [];
    this.userService.getFollowing().subscribe(followingUsers =>
    {
      this.following = followingUsers;
      console.log(this.following);
    });
  }
}
