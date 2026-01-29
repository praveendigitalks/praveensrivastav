import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  Userapis = `${environment.baseurl}/user`;

  getUser():Observable<any>{
    return this.http.get<any>(this.Userapis);
  }
    postUser(userData : any):Observable<any>{
    return this.http.post<any>(this.Userapis, userData);
  }

  getLogUserDevices(userid : string):Observable<any>{
    return this.http.get<any>(`${this.Userapis}/logdevices/${userid}`);
  }
}
