import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AwsServerService } from '../aws-server.service';
import {MatDialog} from '@angular/material/dialog';
import { ApplicationFormComponent } from '../application-form/application-form.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  job;
  added_at;
  needed_at;

  requirements;
  constructor(public authService : AuthService,public router:Router, private route: ActivatedRoute, public AwsServerService:AwsServerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.job = JSON.parse(this.route.snapshot.paramMap.get('data'));
    console.log(this.job);
    this.added_at = new Date(this.job.added_at)
    this.needed_at = new Date(this.job.needed_date)
    this.added_at = this.added_at.toISOString().substring(0, 10);
    this.needed_at = this.needed_at.toISOString().substring(0, 10);

    this.requirements = JSON.parse(this.job.requirements);
    console.log(this.requirements);
  }

  apply(){
    const dialogRef = this.dialog.open(ApplicationFormComponent, {
      width: 'auto',
      data: {job_name: this.job.job_name, job_id: this.job.job_id},
      restoreFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
      }
    });
  
  }





}
