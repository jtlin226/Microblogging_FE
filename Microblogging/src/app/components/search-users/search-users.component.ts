import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  searchInput: string = "";
  foundUsers: User[] = [];

  constructor(
    private userService: UserService) { }

  ngOnInit() {
  }

  search(): void{
    this.foundUsers = []
    this.userService.searchByName(this.searchInput).subscribe( 
      (result:User[]) => {
        this.foundUsers = result;
        this.userService.searchByUsername(this.searchInput).subscribe(
          (searchResults:User[]) => {
            for(let r of searchResults){
              if(!this.foundUsers.some( u => u.id === r.id)){
                this.foundUsers.push(r);
              }
            }
          }
        )
    });
  }
}
