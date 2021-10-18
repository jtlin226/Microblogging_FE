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
  micros: Micro[] = [];
  user: User;
  msg: string;
  url: any;

  constructor(private router : Router, private modalService: NgbModal, private userService: UserService, private microService: MicroService) { }

  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}
  
  ngOnInit() {
    this.microService.getMicros().subscribe(result => this.micros = result.reverse());
    this.userService.getCurrentUser().subscribe(result => this.user = result);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  createMicro() {
    console.log(this.content);
    this.microService.createMicro(this.user, this.content).subscribe();
    this.modalService.dismissAll();
    this.reloadComponent();
  }

  changeImage() {
    console.log(this.url);
  }
}
