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

    currentUser : User | undefined;
    editing : boolean = false;
    successfulUpdate : boolean = false;


  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

}
