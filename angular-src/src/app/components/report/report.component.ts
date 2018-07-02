import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../../services/reservation.service';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  date:String;
  labname:String;
  timeslot:String;
  reservationlist=[];



  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private reservationService:ReservationService
  ) { }

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe(Report =>{
      this.reservationlist = Report.reservationlist;
  },
  err=> {
    console.log(err);
    return false;
  });

  this.date='';
  this.labname='';
  this.timeslot='';

}

onReservationDelete(id){
  this.reservationService.deleteReservation(id).subscribe(data=>{
    if(data.success){
      this.ngFlashMessage.showFlashMessage({
        messages:["Reservation got deleted successfully"],
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

downloadPDF(){

  
  var rows = [];
  var i =0;
  for(let x of this.reservationlist){

    var insiderow = [];
    insiderow.push(this.reservationlist[i].date);
    insiderow.push(this.reservationlist[i].labname);
    insiderow.push(this.reservationlist[i].timeslot);
    i=i+1;
    rows.push(insiderow);
  }

  const doc = new jspdf();
  let columns = ["Date","LabName","Timeslot"];

  
  doc.autoTable(columns,rows);
  doc.text(10, 10, 'Reservations');
  doc.save('Reservations.pdf');
}


downloadPDF2(){
 const date = this.date;
  
  var rows = [];
  var i =0;
  for(let x of this.reservationlist){

    if(date == this.reservationlist[i].date){

    var insiderow = [];
    insiderow.push(this.reservationlist[i].date);
    insiderow.push(this.reservationlist[i].labname);
    insiderow.push(this.reservationlist[i].timeslot);
    
    rows.push(insiderow);}
    i=i+1;
  }

  const doc = new jspdf();
  let columns = ["Date","LabName","Timeslot"];

  
  doc.autoTable(columns,rows);
  doc.text(10, 10, 'Reservations  ');
  doc.save('Reservedfordate.pdf');
}

onShowOneReservation(id){
  this.router.navigate(['editreservation/'+id]);
}

}
