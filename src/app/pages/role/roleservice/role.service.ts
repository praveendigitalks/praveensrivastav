import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  roleApis = `${environment.baseurl}/role`;

  createRole(roleData : any): Observable<any>{
    return this.http.post(`${this.roleApis}`,roleData)
  }
  getRole(): Observable<any>{
    return this.http.get(`${this.roleApis}`)
  }
}
