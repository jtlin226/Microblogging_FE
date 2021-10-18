import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService : UserService,
    private authService : AuthorizationService,
    private route : ActivatedRoute,
    private location : Location) { }

    currentUser : User | undefined;
    editing : boolean = false;
    successfulUpdate : boolean = false;


  ngOnInit() {
    this.userService.getUser(this.authService.jwt).subscribe(user => this.currentUser = user);
  }

}
