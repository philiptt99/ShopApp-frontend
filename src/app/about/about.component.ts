import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  

  selectedFiles: FileList;
  filekey:string;
  filekey1:string;
  show:boolean;
  show1:boolean;
  src:string;
  fullname:string;
  email:string;
  message:string;

  constructor(private uploadService:UploadService) { }
  ngOnInit(): void {
  }
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
    this.filekey1 = file.name;
    this.src="https://sree-project2.s3.us-east-2.amazonaws.com/"+file.name;
    console.log(this.filekey1);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  print(){
    this.filekey=this.filekey1;
    console.log(this.filekey);
    return this.filekey;
  }

  onClick(data){
    console.log(data)
    this.fullname= data.fullName;
    this.email=data.email;
    this.message=data.message;
    this.show=true;
  }
  onClick1(){
    this.show1=true;
  }

  

}
