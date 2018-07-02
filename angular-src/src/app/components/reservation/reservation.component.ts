import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import { Time } from '@angular/common';
import {ReservationService} from '../../services/reservation.service';
import { LabserviceService } from '../../services/labservice.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  labname:String;
  date:Date;
  timeslot:String;
  reservationlist=[];
  lablist=[];

  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private reservationService:ReservationService,
    private labservice:LabserviceService
  ) { }

    ngOnInit() {
      this.reservationService.getAllReservations().subscribe(reservation =>{
        this.reservationlist = reservation.reservationlist;
      },
      err=> {
        console.log(err);
        return false;
      });
      this.labname='';
      this.date=null;

      this.labservice.getAllLabs().subscribe(reservation =>{
        this.lablist = reservation.lablist;
      },
      err=> {
        console.log(err);
        return false;
      });
      this.labname='';
     
      
      
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
 checkReservationConflict(){
   const searchobj = {
     labname: this.labname,
     date: this.date,
     timeslot: this.timeslot
   }

   let conflict = false;
   for(let obj of this.reservationlist){
     console.log(this.reservationlist);
     if(this.date == obj["date"]){
      console.log(this.date+'from this date');
      console.log(obj["date"]+'obj this date')
      if(this.labname == obj["labname"]){

        if(this.timeslot == obj["timeslot"]){
          
          conflict = true;
          
        }

       

     } 
    }
     

      


   }

   

   if(conflict){this.ngFlashMessage.showFlashMessage({
    messages: ["Sorry! That timeslot is not available."], 
    
    dismissible: true, 
    
    timeout: 3000,
    
    type: 'danger'

   });
  }
  else{
    this.onReservationSubmit();
  }


 }
  
  
  

 }


