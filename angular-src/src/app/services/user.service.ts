import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Profile} from 'selenium-webdriver/firefox';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken:any;
  user:any;

  constructor(
    private http:Http
  ) { }
  getAllUsers(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/allusers',{headers:headers})
      .pipe(map(res => res.json()));

  }

  deleteUser(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/users/'+id,{headers:headers})
    .pipe(map(res => res.json()));
  }
}
