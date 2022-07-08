import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AwsServerService } from '../aws-server.service';

export interface Requirement {
  name: string;
}

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  user_id;
  job_name:string ;
  job_types = ['Full-Time','Part-Time',"Hourly Pay","Contract"];
  job_type:string;
  location:string;
  puplish_status = true;
  needed_date;
  description:string;
  departments;
  departments$;
  department;
  today;

  country;
  
  countries=   [ 
     
       {name: 'Australia', code: 'AU'}, 
       {name: 'Canada', code: 'CA'}, 
       {name: 'Czech Republic', code: 'CZ'}, 
       {name: 'Denmark', code: 'DK'}, 
       {name: 'France', code: 'FR'}, 
       {name: 'Israel', code: 'IL'}, 
       {name: 'Japan', code: 'JP'}, 
       {name: 'United Kingdom', code: 'GB'}, 
       {name: 'United States', code: 'US'}, 

     ]

  addJob(){ 
    const requirements_json = JSON.stringify(this.requirements);
    console.log(this.requirements);

    console.log(requirements_json);
    this.AwsServerService.addJob(this.user_id, this.job_name.toLowerCase(), this.description, this.job_type.toLowerCase(), this.needed_date,
       this.puplish_status, this.department, this.today, requirements_json, this.country).subscribe(
      (data) =>{
        this.router.navigate(['jobs']); 
    });
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  requirements: Requirement[] = [{name: 'Ability to learn independently'}, {name: 'Service-oriented'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.requirements.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  remove(requirement: Requirement): void {
    const index = this.requirements.indexOf(requirement);

    if (index >= 0) {
      this.requirements.splice(index, 1);
    }
  }


  constructor(public authService : AuthService,public router:Router, public AwsServerService:AwsServerService) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      user => {
        this.user_id = user.uid;
        console.log(this.user_id); })
       this.departments$ = this.AwsServerService.GetDepartments(this.user_id); 
        this.departments$.subscribe( departments => {
            console.log(departments)
            this.departments = departments;
            this.today = new Date().toString()

          }
        )}
    

}
