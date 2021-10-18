import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Micro } from 'src/app/models/micro';
import { User } from 'src/app/models/user';
import { MicroService } from 'src/app/services/micro.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  content: string;
  username: string;
  micros: Micro[] = [];
  about: string;
  user: User;

  constructor(private router : Router, private modalService: NgbModal, private userService: UserService, private microService: MicroService) { }

  
  
  ngOnInit() {
    this.microService.getMicros().subscribe(result => this.micros = result);
    this.username = this.user.username;
    this.about = this.user.about;
    console.log(this.username);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  createMicro() {
    console.log(this.content);
    console.log("Creating...")
    this.microService.createMicro(this.content);
    console.log("Created...")
  }
}
