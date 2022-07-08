import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AwsServerService {


  API_GET_DEPARTMENTS :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/get_departments";
  API_GET_JOBS :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/get_jobs";
  API_ADD_JOB :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/add_job";
  API_UPLOAD_IMAGE :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/upload_image";
  API_UPLOAD_RESUME :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/upload_resume";
  API_ADD_APPLICATION :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/add_application";
  API_GET_CANDIDATES_APPLICATION :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/get_applicatins";
  API_DELETE_CANDIDATE_APPLICATION :string = "http://ec2-52-23-172-40.compute-1.amazonaws.com/delete_applicatin";


  
  geJobs(){
    return this.http.get<any>(`${this.API_GET_JOBS}`).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  getCandidates(){
    return this.http.get<any>(`${this.API_GET_CANDIDATES_APPLICATION}`).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }


  GetDepartments(user_id:string){
    return this.http.get<any>(`${this.API_GET_DEPARTMENTS}`).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }
  
  addJob(user_id, job_name, description, job_type, needed_date, puplish_status, department, today, requirements_json, country){
    const job = {
      "user_id": user_id,
      "job_name": job_name,
      "description": description,
      "job_type": job_type,
      "needed_date": needed_date,
      "department": department,
      "added_at": today,
      "requirements": requirements_json,
      "country":country
    } 
    console.log(job);
    return this.http.post<any>(`${this.API_ADD_JOB}`, job).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  
  }

  uploadImage(image_obj) {
    let testData:FormData = new FormData();
    testData.append('img', image_obj, image_obj.name);
    console.log(image_obj);
    console.log(testData);

    return this.http.post<any>(`${this.API_UPLOAD_IMAGE}`,testData).pipe(map(res =>{
      const image_data = res
      console.log(res);
      console.log(res);
      console.log(image_data);

      return image_data;
      }
      )
    )
   }


   uploadResume(pdf_obj) {
    let testData:FormData = new FormData();
    testData.append('resume', pdf_obj, pdf_obj.name);
    console.log(pdf_obj);
    console.log(testData);

    return this.http.post<any>(`${this.API_UPLOAD_RESUME}`,testData).pipe(map(res =>{
      const resume_url = res['resume_url']
      console.log(res);
      console.log(res);

      return resume_url;
      }
      )
    )
   }


   addApplication(first_name, last_name, email, phone, image_url, resume_url, job_id, job_name){
    const application = {
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      "image_url": image_url,
      "resume_url": resume_url,
      "job_id": job_id,
      "job_name":job_name

    
    } 
    console.log(application);
    return this.http.post<any>(`${this.API_ADD_APPLICATION}`, application).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  
  }


  deleteCandidate(application_id:string){
    const data = {
      "application_id": application_id,
    

    
    } 
    return this.http.post<any>(`${this.API_DELETE_CANDIDATE_APPLICATION}`, data).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  constructor(private http:HttpClient) { }
}
