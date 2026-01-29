import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviornment';
interface Permission {
  module: string;
  actions: string[];
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginurl = `${environment.baseurl}/login`;

  postLogin(userdata: any) {
    return this.http.post(`${this.loginurl}`, userdata);
  }

  postLogout(userId: string, deviceId: string) {
    return this.http.post(`${this.loginurl}/logout`, {
      userId: userId,
      deviceId: deviceId,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('profileToken');
  }
  getUser(): any {
    const userStr = localStorage.getItem('profileUser');
    // console.log('🚀 ~ AuthService ~ getUser ~ userStr:', userStr);

    return userStr ? JSON.parse(userStr) : null;
  }

  getuserId(): string | null {
    const user = this.getUser();
    return user?._id ?? null;
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
  // hasModulePermission(module: string): boolean {
  //   const user = this.getUser();

  //   return user?.role?.permission?.module === module;
  // }

  // /** check if user has module + action */
  // hasActionPermission(module: string, action: string): boolean {
  //   const permission = this.getUser()?.role?.permission;

  //   return (
  //     permission?.module === module && permission?.actions?.includes(action)
  //   );
  // }

  hasModulePermission(module: string): boolean {
    const user = this.getUser();
    return user?.permissions?.some((p: any) => p.module === module) || false;
  }

  hasActionPermission(module: string, action: string): boolean {
  const user = this.getUser();
  const perms = user?.role?.permissions;
  // console.log("🚀 ~ AuthService ~ hasActionPermission ~ perms:", perms)

  // 🔥 Force array conversion
  const permissionsArray = Array.isArray(perms) ? perms : [];
  // console.log("🚀 ~ AuthService ~ hasActionPermission ~ permissionsArray:", permissionsArray)

  return permissionsArray.some(p =>
    p.module?.trim() === module.trim() &&
    Array.isArray(p.actions) &&
    p.actions.includes(action)
  );
}


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }
}
