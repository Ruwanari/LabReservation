import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import {LabserviceService} from '../../services/labservice.service';
import { timeInterval } from 'rxjs/operators';




 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  labname:String;
  amount:Number;
  lablist=[];
    

  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private labserviceService:LabserviceService
   
    )  { }

  ngOnInit() {
    this.labserviceService.getAllLabs().subscribe(dashboard =>{
      this.lablist = dashboard.lablist;
    },
    err=> {
      console.log(err);
      return false;
    });
    this.labname='';
    this.amount=null;
    
  }

  OnAddNewLabSubmit(){
    const lab = {
      labname:this.labname,
      amount:this.amount
      
    }

    if(!this.validateService.validateAddLab(lab)){
     this.ngFlashMessage.showFlashMessage({
      messages: ["Please fill all the fields!"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'danger'

     });
      return false;
    }

    

//register user
this.authService.addNewLab(lab).subscribe(data=>{

  if(data.success){
    this.ngFlashMessage.showFlashMessage({
      messages: ["A new lab is added successfully"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'success'

     });
     
  }
else{
    this.ngFlashMessage.showFlashMessage({
    messages: ["Something went wrong"], 
    
    dismissible: true, 
    
    timeout: 3000,
    
    type: 'danger'

   });
   this.router.navigate(['/register']);
}

});
 


  }

  onLabDelete(id){
this.labserviceService.deleteLab(id).subscribe(data=>{
  if(data.success){
    this.ngFlashMessage.showFlashMessage({
      messages:["Lab got deleted successfully"],
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


  
      
    
    

}
