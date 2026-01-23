import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviornment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginurl = `${environment.baseurl}/login`;

  postLogin(userdata: any) {
    return this.http.post(`${this.loginurl}`, userdata);
  }

  getToken(): string | null {
    return localStorage.getItem('profileToken');
  }
  getUser(): any {
    const userStr = localStorage.getItem('profileUser');
    console.log('🚀 ~ AuthService ~ getUser ~ userStr:', userStr);

    return userStr ? JSON.parse(userStr) : null;
  }
  // getUserRole(): any {
  //   const token = localStorage.getItem('profileToken');
  //   if (!token) return null;

  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     console.log('payload authservice', payload);
  //     return payload; // return the whole roles object
  //   } catch (e) {
  //     return null;
  //   }
  // }
  hasModulePermission(module: string): boolean {
    const user = this.getUser();

    return user?.role?.permission?.module === module;
  }

  /** check if user has module + action */
  hasActionPermission(module: string, action: string): boolean {
    const permission = this.getUser()?.role?.permission;

    return (
      permission?.module === module && permission?.actions?.includes(action)
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }
}
