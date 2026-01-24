import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http : HttpClient) { }

  aboutApis = `${environment.baseurl}/about`;

  postAbout(aboutData : FormData){
    return this.http.post(this.aboutApis,aboutData);
  }



  getAbout(){
    return this.http.get(this.aboutApis);
  }
}
