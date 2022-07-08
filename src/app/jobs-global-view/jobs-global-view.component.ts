import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AwsServerService } from '../aws-server.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-jobs-global-view',
  templateUrl: './jobs-global-view.component.html',
  styleUrls: ['./jobs-global-view.component.css']
})
export class JobsGlobalViewComponent implements OnInit {
  dataSource;
  internal_view = false;
  posts:Array<any>  = [5,2,3]
  step = -2;
  first_name:string;
  last_name:string;
  gender:string;
  user_id:string;
  jobs$;
  jobs;

  added_dates=[];



 




  goToJob( index){
    this.router.navigate(['/jobs/job', {data: JSON.stringify(this.jobs[index])}] ,{skipLocationChange: true, replaceUrl: false});
 

  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);
 
    
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    this.jobs = this.dataSource.filteredData;

    console.log(this.jobs );


  }

  constructor(public authService : AuthService,public router:Router, public AwsServerService:AwsServerService) { }

  ngOnInit(): void {

    console.log("user"); 
    this.jobs$ = this.AwsServerService.geJobs(); 
    this.jobs$.subscribe( jobs => {
        console.log(jobs)
        this.jobs =jobs;
        this.dataSource = new MatTableDataSource(this.jobs);
        this.dataSource.filterPredicate = (data, filter: string) => {
          return data.job_name.includes(filter);
         };
         for(const i in jobs){
console.log(i);
console.log(jobs[i]['added_at']);

          const added_at = new Date(jobs[i]['added_at']);
          console.log(added_at);

          const added_at2 = added_at.toISOString().substring(0, 10);
          console.log(added_at2);

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


