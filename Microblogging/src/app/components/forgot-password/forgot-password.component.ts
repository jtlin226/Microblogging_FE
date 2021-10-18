import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";
  usernameNotFound: boolean = false;
  usernameFound: boolean = false;
  forgottenUser: User;

  findUser()
  {
    this.usernameNotFound = false;
    this.usernameFound = false;
    this.userService.getSpecificUser(this.username).subscribe((result) =>
    {
      this.forgottenUser = result;
      this.usernameFound = true;
    },
    (error) =>
    {
      console.log(console.error());
      this.usernameNotFound = true;
    });
  }

  resetPassword()
  {
    let returnedUser;
    this.userService.updateUser(this.forgottenUser, this.password).subscribe((result) =>
    {
      returnedUser = result
      console.log(returnedUser);
      // redirect to login page after 3 seconds
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 3000);
    })
  }
}
