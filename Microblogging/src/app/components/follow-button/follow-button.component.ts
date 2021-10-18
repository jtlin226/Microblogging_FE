import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() user: User | undefined;
  showFollow: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFollowing().subscribe(
      (following: User[]) => {
        this.showFollow = !this.userService.isUserFollowed(this.user!, following);
      }
    )
  }

  followUser(){
    this.userService.followUser(this.user!).subscribe(
      (result) => {
        console.log(result);
        this.showFollow = false;
      }
    );
    
  }

  unFollowUser(){
    this.userService.unFollowUser(this.user!).subscribe(
      (result) => {
        console.log(result);
        this.showFollow = true;
      }
    );
  }
}
