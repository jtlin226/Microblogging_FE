import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-followers',
  templateUrl: './my-followers.component.html',
  styleUrls: ['./my-followers.component.css']
})
export class MyFollowersComponent implements OnInit {

  followers: User[] = [];

  constructor(private authService: AuthorizationService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getFollowers(this.authService.jwt).subscribe(
      (result) => {
        this.followers = result;
        console.log(this.followers);
      }
    )
  }



}
