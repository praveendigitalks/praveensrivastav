import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
@Injectable({
  providedIn: 'root'
})
export class ResumeService {

 constructor(private http: HttpClient) {}

  resumeApis = `${environment.baseurl}/resume`;


  postresume(resumeData: FormData) {
    return this.http.post<any>(this.resumeApis, resumeData);
  }

  getresume() {
    return this.http.get<any>(this.resumeApis);
  }
  getresumebyId(resumeId: string) {
    return this.http.get<any>(`${this.resumeApis}/${resumeId}`);
  }

  updateresume(resumeId: string, resumeData: any) {
    return this.http.put<any>(`${this.resumeApis}/${resumeId}`, resumeData);
  }
}
