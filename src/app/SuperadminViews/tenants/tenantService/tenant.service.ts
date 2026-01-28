import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http : HttpClient) {}

    tenantapi = `${environment.baseurl}/tenant`;


  createTenant(data : any):Observable<any>{
    return this.http.post(`${this.tenantapi}`,data);
  }
 getTenant():Observable<any>{
  return this.http.get(`${this.tenantapi}`);
 }

 getTenantbyID(id : string):Observable<any>{
  return this.http.get(`${this.tenantapi}/${id}`);
 }
}
