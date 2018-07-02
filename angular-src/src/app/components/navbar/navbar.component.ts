import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  firstname:String;
  lastname:String;
  username:String;
  email:String;

  userlist=[];

  constructor(
    private authService:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit() {
    
    
  }

  onLogoutClick(){
    this.authService.logout();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["You are now logged out"], 
      dismissible: true, 
      timeout: 5000,
      type: 'success'
     });
     this.router.navigate(['login']);
     return false;
  }

  




}


