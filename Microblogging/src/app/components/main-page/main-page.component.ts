import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Micro } from 'src/app/models/micro';
import { MicroService } from 'src/app/services/micro.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  content: string = "";
  constructor(private router : Router, private modalService: NgbModal, private userService: UserService, private microService: MicroService) { }

  micros: Micro[] = [];
  
  ngOnInit() {
    this.microService.getMicros().subscribe(result => this.micros = result);
    console.log(this.micros);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  createMicro() {
    let newMicro = {
      id: 0,
      content: this.content,
      user: this.userService.getUserId()
    }
  }
}
