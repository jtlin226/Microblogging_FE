import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService : UserService,
    private route : ActivatedRoute,
    private location : Location) { }

    currentUser : User | undefined;
    successfulUpdate : boolean = false;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  updateProfile(){
    this.userService.updateUser(this.currentUser).subscribe( (result) => {
      this.successfulUpdate = true;
      setTimeout(() => this.goBack(), 3000)
    })
  }

  private goBack(){
    this.location.back();
  }

}
