import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_id:string;
  name:string;
  email:string;
  password:string;
  confirmedPassword:string;
  errorMessage:string;
  hasError:boolean = false;

  

  onSubmit(){
    if(this.password.length < 8){
      this.hasError=true;
      this.errorMessage = 'The password must contain at least 8 characters.';
    }else{
        this.auth.fetch(this.email).then((res) => {
            if(res.length){
                this.hasError=true;
                this.errorMessage = "The email address is already in use by another account.";  
            }else if(this.password!=this.confirmedPassword){
                this.errorMessage = "Password mismatch"
            }else{
                this.auth.register(this.email, this.password).then(res => {
                this.user_id = res.user.uid;      
                this.router.navigate(['/jobs'])
              })
            }
      }).catch(()=>{
        this.hasError=true;
        this.errorMessage = "The email address is badly formatted.";      
      })
    }
  }


  clearError(){
    this.errorMessage = '';
  }

  
  constructor(private auth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

}
