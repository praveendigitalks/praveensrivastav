import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

   constructor(private http: HttpClient) {}

  ContactApis = `${environment.baseurl}/contact`;

  postContact(ContactData: FormData) {
    return this.http.post<any>(this.ContactApis, ContactData);
  }

  getContact() {
    return this.http.get<any>(this.ContactApis);
  }
  getContactbyId(ContactId: string) {
    return this.http.get<any>(`${this.ContactApis}/${ContactId}`);
  }

  updateContact(ContactId: string, ContactData: any) {
    return this.http.put<any>(`${this.ContactApis}/${ContactId}`, ContactData);
  }
}
