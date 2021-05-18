import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor() { }
  filekey:string;
  uploadfile(file) {
    const bucket = new S3(
      {
        accessKeyId: 'AKIA547YFSLXVN3W2LWM',
        secretAccessKey: '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',
        region: 'us-east-2',
      }
    );
    const params = {
      Bucket: 'sree-project2',
      Key: file.name,
      Body:file
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      this.filekey=file.Key;
      return true;
    });
  }
    print(){
      console.log(this.filekey);
      return this.filekey;
    }
}