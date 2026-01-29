import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  aboutApis = `${environment.baseurl}/about`;

  postAbout(aboutData: FormData) {
    return this.http.post<any>(this.aboutApis, aboutData);
  }

  getAbout() {
    return this.http.get<any>(this.aboutApis);
  }
  getAboutbyId(aboutId: string) {
    return this.http.get<any>(`${this.aboutApis}/${aboutId}`);
  }

  updateAbout(aboutId: string, aboutData: any) {
    return this.http.put<any>(`${this.aboutApis}/${aboutId}`, aboutData);
  }
}
