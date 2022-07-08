import { JobsComponent } from './jobs/jobs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobComponent } from './job/job.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { JobsGlobalViewComponent } from './jobs-global-view/jobs-global-view.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'jobs',component:JobsComponent},
  {path:'application-form',component:JobFormComponent},
  {path:'jobs/job',component:JobComponent},
  {path:'candidates',component:CandidatesComponent},
  {path:'jobs-global',component:JobsGlobalViewComponent},



  //{path: 'register', component: RegisterComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


