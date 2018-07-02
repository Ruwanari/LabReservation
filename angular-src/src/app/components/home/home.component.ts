import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import { Time } from '@angular/common';
import {ReservationService} from '../../services/reservation.service';
import { LabserviceService } from '../../services/labservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
