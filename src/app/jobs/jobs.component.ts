import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AwsServerService } from '../aws-server.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  user_id:string;
  jobs$;
  jobs;
  added_dates=[];

 
  goToJob(index){
    this.router.navigate(['/jobs/job', {data: JSON.stringify(this.jobs[index])}] ,{skipLocationChange: true, replaceUrl: false});
  }


  constructor(public authService: AuthService, public router:Router, public AwsServerService:AwsServerService) { }

  ngOnInit(): void {
    this.jobs$ = this.AwsServerService.geJobs(); 
    this.jobs$.subscribe( jobs => {
        console.log(jobs)
        this.jobs =jobs;

        for(const i in jobs){

          const added_at = new Date(jobs[i]['added_at']);

          const added_at2 = added_at.toISOString().substring(0, 10);
          this.added_dates.push(added_at2);
        }


      }
    )
    this.authService.getUser().subscribe(
      user => {
        this.user_id = user.uid;
        console.log(this.user_id); 
        console.log(user); 
      }
    )
  }
}


