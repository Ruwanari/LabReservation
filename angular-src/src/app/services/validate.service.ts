import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined){
      return false;
    }
    else{
      return true;
    }

    
  }

  
  validateEmail(email){

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateAddLab(lab){
    if(lab.labname == undefined && lab.amount == undefined){
      return false;
    }
    else{
      return true;
    }

    
  }
  validateReservation(reservation){
    if(reservation.labname == undefined || reservation.date == undefined || reservation.timeslot == undefined ){
      return false;
    }
    else{
      return true;
    }

    
  }
}
