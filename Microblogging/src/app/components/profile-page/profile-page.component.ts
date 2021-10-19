import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService : UserService,
    private route : ActivatedRoute,
    private location : Location) { }

    username: string = '';
    firstname: string = '';
    lastname: string = ''
    about: string = '';
    imageURL: string = '';

    currentUser : User | undefined;
    editing : boolean = false;
    successfulUpdate : boolean = false;


  /**
   * get current user to populate page. This page only shows information and routes to other pages where changes can be made
   */
  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user
      this.username = user.username
      this.firstname = user.firstName
      this.lastname = user.lastName
      this.about = user.about
      this.imageURL = user.imageURL
    });
  }

}
