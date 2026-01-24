import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/authservice/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserUtil } from '../../components/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogin = false;
  errorMessage: string = '';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.Isloggin();
  }
  isMobileOpen = false;

  toggleMenu() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMenu() {
    this.isMobileOpen = false;
  }

  // logout() {
  //   // const userStr = localStorage.getItem('profileUser');

  //   // if (userStr) {
  //   //   const user = JSON.parse(userStr); // convert string → object
  //   //   const userId = user._id;

  //     // console.log('User ID:', userId);
  //     const userId = this.authService.getuserId
  //     const deviceId = localStorage.getItem('deviceId');

  //     this.authService.postLogout(userId, deviceId!).subscribe({
  //       next: () => {
  //         localStorage.removeItem('profileToken');
  //         localStorage.removeItem('profileUser');
  //         localStorage.removeItem('loggedDevices');
  //         // ❌ DO NOT remove deviceId
  //         this.router.navigate(['/login']);
  //       },
  //       error: (err) => {

  //         console.log("🚀 ~ HeaderComponent ~ logout ~  this.errorMessage:",  err);
  //       },
  //     });
  //   // }
  // }

  logout() {
    const userId = this.authService.getuserId(); // ✅ getter
    const deviceId = localStorage.getItem('deviceId');

    if (!userId || !deviceId) return;

    this.authService.postLogout(userId, deviceId).subscribe({
      next: () => {
        localStorage.removeItem('profileToken');
        localStorage.removeItem('profileUser');
        localStorage.removeItem('loggedDevices');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Logout error:', err);
      },
    });
  }

  Isloggin() {
    this.isLogin = this.authService.isLoggedIn();
  }
}
