import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule,Routes} from '@angular/router';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';

import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ViewreservationComponent } from './components/viewreservation/viewreservation.component';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReportComponent } from './components/report/report.component';
import { EditreservationComponent } from './components/editreservation/editreservation.component';

const appRoutes:Routes = [ 
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'viewreservation',component:ViewreservationComponent},
  {path:'viewusers',component:ViewusersComponent},
  {path:'report',component:ReportComponent},
  {path:'editreservation/:id',component:EditreservationComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ReservationComponent,
    ViewreservationComponent,
    ViewusersComponent,
    FooterComponent,
    ReportComponent,
    EditreservationComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule,
    
    
   
   
  ],
  providers:[ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule { }
