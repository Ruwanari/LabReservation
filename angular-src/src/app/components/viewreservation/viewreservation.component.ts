import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-viewreservation',
  templateUrl: './viewreservation.component.html',
  styleUrls: ['./viewreservation.component.css']
})
export class ViewreservationComponent implements OnInit {
reservation:Object;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.viewReservations().subscribe(reservation=>{
      this.reservation=reservation;
    },
    err=>{
      console.log(err);
      return false;
    }
  )
  }

}
