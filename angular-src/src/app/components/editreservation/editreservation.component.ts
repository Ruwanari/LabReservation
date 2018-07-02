import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ValidateService } from '../../services/validate.service'; 
import { LabserviceService} from '../../services/labservice.service'
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router'; 


@Component({
  selector: 'app-editreservation',
  templateUrl: './editreservation.component.html',
  styleUrls: ['./editreservation.component.css']
})
export class EditreservationComponent implements OnInit {
  reservation:any;
  reservationId:string
  id:string;
  username:string;
  date:string;
  labname:String;
  reserveddate:String;
  timeslot:String;
  lablist = [];


  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabserviceService,
    private reservationService:ReservationService,
    private authService:AuthService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
    });
    this.reservationService.getOneReservation(this.id).subscribe(onereservation => {
      this.reservation = onereservation.reservation;
      console.log(this.reservation);  
      this.labname = this.reservation.labname;
      this.date = this.reservation.date;
      this.timeslot = this.reservation.timeslot;
      
    },
    err => {
      console.log(err);
      return false;
    });

  }
  

  onEditLabReservation(resId){
    
   
    
    const editedreservation = {
      
     
      labname:this.labname,
      date:this.date,
     timeslot:this.timeslot

  } 
  console.log(editedreservation);
  console.log('on edit reservation');
  this.reservationService.editReservation(this.id,editedreservation).subscribe(data => {
    console.log('u are done');
    if(data.success) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Reservation has been successfully Edited"], 
        dismissible: true, 
        timeout: 5000,
        type: 'success'
     }); 
     this.router.navigate(['/report']); 
      
    

    } else {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Something went wrong"], 
       dismissible: true, 
       timeout: 5000,
       type: 'danger'
     });  
     this.router.navigate(['/dashboard']); 
    }
  });


  
}

  



}
