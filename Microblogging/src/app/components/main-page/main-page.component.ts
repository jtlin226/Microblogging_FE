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
  user: User = {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    imageURL: "",
    about: ""
  };
  // msg: string;
  // url: any;
  imageURL: string;

  constructor(private router : Router, private modalService: NgbModal, private userService: UserService, private microService: MicroService) { }

  // selectFile(event: any) {
	// 	if(!event.target.files[0] || event.target.files[0].length == 0) {
	// 		this.msg = 'You must select an image';
	// 		return;
	// 	}
		
	// 	var mimeType = event.target.files[0].type;
		
	// 	if (mimeType.match(/image\/*/) == null) {
	// 		this.msg = "Only images are supported";
	// 		return;
	// 	}
		
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(event.target.files[0]);
		
	// 	reader.onload = (_event) => {
	// 		this.msg = "";
	// 		this.url = reader.result; 
	// 	}
	// }
  
  /**
   * call service funtions to get the current user logged in and all micros(posts)
   * of that user and other users followed
   */
  ngOnInit() {
    this.microService.getMicros().subscribe(result => this.micros = result.reverse());
    this.userService.getCurrentUser().subscribe(result => this.user = result);
  }

  /**
   * function to reload the current component
   */
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  /**
   * Open up a specific modal
   * @param content the modal to open up
   */
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  /**
   * Function to create a micro(post)
   */
  createMicro() {
    console.log(this.content);
    this.microService.createMicro(this.user, this.content).subscribe();
    this.modalService.dismissAll();
    this.reloadComponent();
  }

  /**
   * Function to update the profile image of the user
   */
  changeImage() {
    this.user.imageURL = this.imageURL;
    this.userService.updateUser(this.user).subscribe();
    this.modalService.dismissAll();
    this.reloadComponent();
  }
}
