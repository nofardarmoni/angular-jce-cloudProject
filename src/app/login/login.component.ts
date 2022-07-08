import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  ErrorMessage:string;

  onSubmit(){
    this.auth.login(this.email,this.password)
    .then(res => {
      console.log({res:res.user});
      this.router.navigate(['/jobs'])  
    })
    .catch(err => {
      console.log(err);
      this.ErrorMessage = err.message; 
      })
  }

  
  clearError(){
    this.ErrorMessage = '';
  }

  constructor(public auth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

}
