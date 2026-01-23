import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/authservice/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  isLogin = false
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
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


  logout() {
    const deviceId = localStorage.getItem('deviceId');
      
    this.authService.postLogout(deviceId!).subscribe({
      next: () => {
        localStorage.removeItem('profileToken');
        localStorage.removeItem('profileUser');
        localStorage.removeItem('loggedDevices');
        // ❌ DO NOT remove deviceId
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  Isloggin() {
    this.isLogin = this.authService.isLoggedIn()
  }
}
