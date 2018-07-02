import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {

  firstname:String;
  lastname:String;
  username:String;
  userlist=[];

  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(Viewusers =>{
      this.userlist = Viewusers.userlist;
  },
  err=> {
    console.log(err);
    return false;
  });
  this.firstname='';
  this.lastname='';
  this.username='';
  
}

onUserDelete(id){
  this.userService.deleteUser(id).subscribe(data=>{
    if(data.success){
      this.ngFlashMessage.showFlashMessage({
        messages:["User got deleted successfully"],
        dismissible: true,
        timeout:5000,
        type:'success'
      });
      this.ngOnInit();
    }
    else{
      this.ngFlashMessage.showFlashMessage({
        messages:["Something went wrong"],
        dismissible: true,
        timeout:5000,
        type:'danger'
    });
    }
  })
    }

}
