import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';




 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname:String;
  lastname:String;
  username:String;
  email:String;
  password:String;  

  constructor(
    private validateService:ValidateService,
    private  ngFlashMessage:NgFlashMessageService,
    private authService:AuthService,
    private router:Router
   
    )  { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username:this.username,
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      password:this.password
    }

    if(!this.validateService.validateRegister(user)){
     this.ngFlashMessage.showFlashMessage({
      messages: ["Please fill all the fields!"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'danger'

     });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.ngFlashMessage.showFlashMessage({
        messages: ["Please enter a valid email!"], 
        
        dismissible: true, 
        
        timeout: 3000,
        
        type: 'danger'
  
       });
      return false;
    }

//register user
this.authService.registerUser(user).subscribe(data=>{

  if(data.success){
    this.ngFlashMessage.showFlashMessage({
      messages: ["You are now registered and can log in"], 
      
      dismissible: true, 
      
      timeout: 3000,
      
      type: 'success'

     });
     this.router.navigate(['/login']);
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
