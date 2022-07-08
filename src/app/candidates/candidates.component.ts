import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AwsServerService } from '../aws-server.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  user_id;
  candidates;
  candidates$;
  displayedColumns: string[] = ['position','job_name','first_name', 'last_name','email','phone', 'image','cv', 'delete'];
  constructor(public authService : AuthService,public router:Router, public AwsServerService:AwsServerService,) { }


  delete(index){
    const application_id = this.candidates[index]['application_id'];
    console.log(application_id);
    this.AwsServerService.deleteCandidate(application_id).subscribe(
      (data) =>{
        this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['candidates']));})

  }
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.user_id = user.uid;
        console.log(this.user_id); 
        console.log(user); 

        this.candidates$ = this.AwsServerService.getCandidates(); 
        this.candidates$.subscribe( candidates => {
            console.log(candidates)
            this.candidates =candidates;
            
          }
        )}
    )



  }

}
