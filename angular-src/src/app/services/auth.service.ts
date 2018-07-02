import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Profile} from 'selenium-webdriver/firefox';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;


  constructor(
    private http:Http,
   
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
      .pipe(map(res => res.json()));

  }

  addNewLab(lab){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/dashboard',lab,{headers:headers})
      .pipe(map(res => res.json()));

  }

  createReservation(reservation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reservations/reservation',reservation,{headers:headers})
      .pipe(map(res => res.json()));
  }

 
 
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authentication',user,{headers:headers})
    .pipe(map(res => res.json()));
}

getProfile(){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .pipe(map(res => res.json()));
}
viewReservations(){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reservations/viewreservation',{headers:headers})
    .pipe(map(res => res.json()));
}

   storeUserDate(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token= localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  loggedIn(){
    if(localStorage.id_token == undefined){
      return true;
    } else {
      const helper = new JwtHelperService();
      // console.log(helper.isTokenExpired(localStorage.id_token));
      return helper.isTokenExpired(localStorage.id_token);
      
    }
   
  }

 logout(){
   this.authToken=null;
   this.user=null;
   localStorage.clear();
 }

 isAdminLogged(){
   const user = this.loadUser();
   if(user == null){
     return false;
   } 
   else{
     const email = user.email;
     if(email == "annejones@gmail.com"){
       return true;
     }
     else{
       return false;
     }
   }
 }

  

 
}
