import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";
  usernameNotFound: boolean = false;
  usernameFound: boolean = false;
  successfulUpdate: boolean = false;

  findUser()
  {
    this.usernameNotFound = false;
    this.usernameFound = false;
    this.userService.getSpecificUser(this.username).subscribe((result) =>
    {
      this.authService.setJwt(result);
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
    this.userService.resetPassword(this.password).subscribe((result) =>
    {
      returnedUser = result
      console.log(returnedUser);
      this.authService.setJwt("");
      this.successfulUpdate = true;
      // redirect to login page after 3 seconds
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 3000);
    },
    (error) =>
    {
      console.log(console.error());
    });
  }
}
