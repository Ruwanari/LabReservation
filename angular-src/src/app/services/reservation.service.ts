import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Profile} from 'selenium-webdriver/firefox';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  authToken:any;
  reservation:any;

  constructor(
    private http:Http
  ) { }
  getAllReservations(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reservations/allreservations',{headers:headers})
      .pipe(map(res => res.json()));

  }

  deleteReservation(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/reservations/'+id,{headers:headers})
    .pipe(map(res => res.json()));
  }

  getOneReservation(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reservations/getreservation/'+id,{headers:headers})
      .pipe(map(res => res.json()));
  }

  editReservation(id,reservation) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reservations/editreservation/'+id,reservation,{headers:headers})
      .pipe(map(res => res.json()));

  }

 




  
}



