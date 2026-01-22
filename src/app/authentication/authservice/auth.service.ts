import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviornment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }


  loginurl = `${environment.baseurl}/login`;

  postLogin(userdata : any){
    return  this.http.post(`${this.loginurl}`, userdata)
  }

  
} 
