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

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.username = user.username)
  }

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

  goBack(){
    this.router.navigateByUrl("/profile")
  }
}
