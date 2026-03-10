import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../authservice/auth.service';
import { getDeviceId, getDeviceInfo } from '../../components/device';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currentYear = new Date().getFullYear();
  errormessage: string = '';
  onLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.onLogin = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hasModuleAccess(
    module: string,
    action: 'read' | 'create' | 'update' | 'delete' = 'read'
  ): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.some(
      (perm: any) =>
        perm.moduleName === module && perm.permissions?.[action] === 1
    );
  }

  ngOnInit() {
    document.body.style.backgroundImage = "url('/Bg.jpeg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }

  // Login() {
  //   if (this.onLogin.invalid) return;

  //   const deviceInfo = getDeviceInfo();

  //   const payload = {
  //     userName: this.onLogin.value.userName,
  //     password: this.onLogin.value.password,

  //     deviceId: getDeviceId(), // ✅ string
  //     deviceInfo: deviceInfo, // ✅ full object
  //   };

  //   this.authService.postLogin(payload).subscribe({
  //     next: (res: any) => {
  //       // if (res.token) {
  //       //   localStorage.setItem('profileToken', res.token);
  //       //   localStorage.setItem('profileUser', JSON.stringify(res.user));

  //       //   // 👇 STORE DEVICES LIST (important)
  //       //   localStorage.setItem('loggedDevices', JSON.stringify(res.devices));

  //       //   this.router.navigateByUrl('/');
  //       // }

  //       if (res.token) {
  //         localStorage.setItem('profileToken', res.token);
  //         localStorage.setItem('profileUser', JSON.stringify(res.user));

  //         if (!res.user.isSuperAdmin) {
  //           localStorage.setItem('loggedDevices', JSON.stringify(res.devices));
  //           localStorage.setItem('deviceId', getDeviceId()); // 👈 only for normal users
  //         }

  //         // 🔀 Redirect
  //         if (res.user.isSuperAdmin) {
  //           this.router.navigateByUrl('/superadmin');
  //         } else {
  //           this.router.navigateByUrl('/');
  //         }
  //       }
  //     },
  //     error: (err) => {
  //       this.errormessage = err.error.message;
  //       console.log(err.error.message);
  //     },
  //   });
  // }

  Login() {
    if (this.onLogin.invalid) return;

    const deviceInfo = getDeviceInfo();

    const payload = {
      userName: this.onLogin.value.userName,
      password: this.onLogin.value.password,
      deviceId: getDeviceId(),
      deviceInfo: deviceInfo,
    };

    this.authService.postLogin(payload).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('profileToken', res.token);
          localStorage.setItem('profileUser', JSON.stringify(res.user));


          if (!res.user.isSuperAdmin) {
            localStorage.setItem('loggedDevices', JSON.stringify(res.devices));
            localStorage.setItem('deviceId', getDeviceId());
          }

          // ✅ SET BACKGROUND IMAGE
          const heroImage = res?.user?.tenantId?.heroImage;

          if (heroImage) {
            const fullUrl = 'http://localhost:5000' + heroImage;
            document.body.style.backgroundImage = `url(${fullUrl})`;
          } else {
            document.body.style.backgroundImage = "url('/Bg.jpeg')";
          }

          // 🔀 Redirect
          if (res.user.isSuperAdmin) {
            this.router.navigateByUrl('/superadmin');
          } else {
            this.router.navigateByUrl('/');
          }
        }
      },
      error: (err) => {
        this.errormessage = err.error.message;
        console.log(err.error.message);
      },
    });
  }
  getUser(): any {
    const userStr = localStorage.getItem('profileUser');
    console.log('🚀 ~ AuthService ~ getUser ~ userStr:', userStr);

    return userStr ? JSON.parse(userStr) : null;
  }
}
