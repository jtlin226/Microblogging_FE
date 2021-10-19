import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Microblogging';
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigate([""])
  }
}


