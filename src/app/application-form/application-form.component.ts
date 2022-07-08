import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AwsServerService } from '../aws-server.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

export interface DialogData {
  job_name:string;

}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  form: FormGroup;

  
  phone;
  email;
  first_name;
  last_name;
  image_url;
  resume_url;
  job_id;

  image_obj;
  resume_obj;

  spinnerStatus;

  image_confidence;
  image_sharpness;
  color_confidence= "black";
  color_sharpness = "black";
  image_status = false;
  status = false;

sendApplication(){

}

  // image upload
  uploadImage(imgFile) {
    this.image_obj = imgFile.target.files[0];
    if(this.image_obj!= undefined){
      console.log("Upload Image ang get URL:")
      console.log(this.image_obj)
      this.spinnerStatus = true;
      this.AwsServerService.uploadImage(this.image_obj).subscribe(
      image_data => {
          this.image_url= image_data['img_url'];
          this.image_confidence= image_data['confidence'];
          this.image_sharpness= image_data['sharpness'];
          if (Number(this.image_confidence)< 90){
            this.color_confidence = "#c70808";
            this.image_status = false;

          }else{
            this.color_confidence = "#13965f";
            this.image_status = true;


          }
          if (Number(this.image_sharpness)< 80){
            this.color_sharpness = "#c70808";
            this.image_status = false;

          }else{
            this.color_sharpness = "#13965f";
            this.image_status = true;

          }
          if ((this.image_status == true) && this.resume_url){
            this.status = true;
          }

          console.log(this.image_confidence);
          this.spinnerStatus = false;

      }
    );}
}


  // C.V. upload
  uploadResume(resumeFile) {
    this.resume_obj = resumeFile.target.files[0];
    if(this.resume_obj!= undefined){
      console.log("Upload Image ang get URL:")
      console.log(this.resume_obj)
      this.spinnerStatus = true;
      this.AwsServerService.uploadResume(this.resume_obj).subscribe(
      url => {
          this.resume_url= url
          console.log(this.resume_url);
          this.spinnerStatus = false;
          if ((this.image_status == true) && this.resume_url){
            this.status = true;
          }
      }
    );}
}

addApplication(){ 
  this.job_id=this.data.job_id;
  console.log(this.job_id);
  this.AwsServerService.addApplication(this.first_name, this.last_name, this.email, this.phone, this.image_url, this.resume_url, this.job_id, this.data.job_name).subscribe(
    (data) =>{
      console.log(data);
      this.dialogRef.close();

      this.router.navigate(['candidates']); 

});

}

  constructor(public AwsServerService:AwsServerService ,public dialogRef: MatDialogRef<ApplicationFormComponent>,public router:Router, private _formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({  
      first_name: ['', Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],

 
  });
  }

}
