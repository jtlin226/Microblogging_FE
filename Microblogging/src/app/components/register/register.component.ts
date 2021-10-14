import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


/**
 * This component allows users to create an account that is needed
 * to access the rest of the application features
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // Inject UserService to bring in methods to grab needed information and Router for routing
  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // information received from the page input
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  
  // boolean flags to indicate the state of operations
  isTrainer: boolean = false;
  failedRegister: boolean = false;
  successful: boolean = false;

  /**
   * Calls UserService function to insert a new user
   */
  register() {
    // Create a new user with inputs from the web page
    const newUser: User & {password: string} = {
      id: 0,
      firstName: this.firstname,
      lastName: this.lastname,
      username: this.username,
      password: this.password,
      imageURL: "",
      about: "",
    }
    let returnedUser;
    
    // subscribe to an observable
    this.service.registerNewUser(newUser).subscribe((result) => {
      this.failedRegister = false;

      returnedUser = result
      // set successful to true when successfully created the returnedUser
      this.successful = true;
      console.log(returnedUser);
      // redirect to login page after 3 seconds
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 3000);

    },
    // performs following code when an error occurs
    (error) => {
      console.log(error);
      this.failedRegister = true;
      this.successful = false;
    });
  }

}
