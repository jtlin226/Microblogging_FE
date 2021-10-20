import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  constructor(private userService : UserService,
    private router : Router) { }

  password1 : string = ''
  password2 : string = ''
  username : string = ''
  successfulUpdate : boolean = false
  passwordMatch : boolean = true

  /**
   * get current user to populate page information
   */
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.username = user.username)
  }

  /**
   * function used to update current user's password. Will only work if both passwords inputted are the same
   */
  updatePassword(){
    if(this.password1 === this.password2){
      this.userService.resetPassword(this.password1).subscribe((result) => {
        this.successfulUpdate = true;
        setTimeout(() => this.goBack(),3000)
      })
    } else {
      this.passwordMatch = false;
    }
  }

  /**
   * private function used by updatePassword to go back to the my profile page after the password is successfully changed
   */
  goBack(){
    this.router.navigateByUrl("/profile")
  }
}
