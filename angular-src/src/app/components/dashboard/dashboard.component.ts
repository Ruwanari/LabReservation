import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';




 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  labname:String;
  amount:Number;
    

  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router
   
    )  { }

  ngOnInit() {
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

    

}
