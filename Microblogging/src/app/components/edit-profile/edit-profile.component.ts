import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService : UserService,
    private router : Router) { }

    username: string = '';
    about: string = '';
    imageURL: string = '';

    currentUser : User | undefined;
    successfulUpdate : boolean = false;

  /**
   * gets current user to populate page
   */
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user
      this.username = user.username
      this.about = user.about
      this.imageURL = user.imageURL
    });
  }

  /**
   * function used to update current user with what they replaced the values with on the page
   */
  updateProfile(){
    this.currentUser!.about = this.about;
    this.currentUser!.imageURL = this.imageURL;
    this.userService.updateUser(this.currentUser).subscribe( (result) => {
      this.successfulUpdate = true;
      setTimeout(() => this.goBack(), 3000)
    })
  }

  /**
   * private function used in updateProfile() to go to my profile page after the user is updated
   */
  private goBack(){
    this.router.navigateByUrl("/profile");
  }

}
