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
    return this.http.get(this.Userapis);
  }
    postUser(userData : any):Observable<any>{
    return this.http.post(this.Userapis, userData);
  }
}
