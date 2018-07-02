import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Profile} from 'selenium-webdriver/firefox';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LabserviceService {
  authToken:any;
  lab:any;

  constructor(
    private http:Http
  ) { }
  getAllLabs(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/alllabs',{headers:headers})
      .pipe(map(res => res.json()));

  }

  deleteLab(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/labs/'+id,{headers:headers})
    .pipe(map(res => res.json()));
  }

  
}



