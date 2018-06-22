import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  labname:String;
  date:Date;
  timeslot:String;


  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onReservationSubmit(){
    const reservation = {
      labname:this.labname,
      date:this.date,
      timeslot:this.timeslot
    }

    if(!this.validateService.validateReservation(reservation)){
     this.ngFlashMessage.showFlashMessage({
      messages: ["Please fill all the fields!"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'danger'

     });
      return false;
    }

    

//register user
this.authService.createReservation(reservation).subscribe(data=>{

  if(data.success){
    this.ngFlashMessage.showFlashMessage({
      messages: ["You made a successful reservation"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'success'

     });
    }
else{
    this.ngFlashMessage.showFlashMessage({
    messages: ["Something went wrong"], 
    
    dismissible: true, 
    
    timeout: 3000,
    
    type: 'danger'

   });
   this.router.navigate(['/register']);
}

});
 


  }

}
